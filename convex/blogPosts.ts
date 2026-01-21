import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all blog posts
export const list = query({
  args: { 
    published: v.optional(v.boolean()),
    category: v.optional(v.string()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const q = args.published !== undefined
      ? ctx.db.query("blogPosts").withIndex("by_published", (q) => q.eq("published", args.published!))
      : ctx.db.query("blogPosts");
    
    let filteredQ = q;
    if (args.category) {
      filteredQ = q.filter((q) => q.eq(q.field("category"), args.category));
    }
    
    const posts = await filteredQ.order("desc").collect();
    
    if (args.limit) {
      return posts.slice(0, args.limit);
    }
    
    return posts;
  },
});

// Get a single blog post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Create a blog post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    published: v.boolean(),
    is_featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Auth check would be implemented here
    return await ctx.db.insert("blogPosts", {
      ...args,
      created_date: Date.now(),
    });
  },
});

// Update a blog post
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    published: v.optional(v.boolean()),
    is_featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, { ...updates, updated_date: Date.now() });
  },
});

// Delete a blog post
export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
