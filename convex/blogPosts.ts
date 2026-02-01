import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./permissions";

// List all blog posts
export const list = query({
  args: {
    token: v.optional(v.string()),
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

// Get a single blog post by ID
export const get = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a blog post
export const create = mutation({
  args: {
    token: v.optional(v.string()),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    published: v.boolean(),
    is_featured: v.optional(v.boolean()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { token, ...postData } = args;
    await requireAdmin(ctx, token ?? null);
    return await ctx.db.insert("blogPosts", {
      ...postData,
      created_date: Date.now(),
    });
  },
});

// Update a blog post
export const update = mutation({
  args: {
    token: v.optional(v.string()),
    id: v.id("blogPosts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    published: v.optional(v.boolean()),
    is_featured: v.optional(v.boolean()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { token, id, ...updates } = args;
    await requireAdmin(ctx, token ?? null);
    return await ctx.db.patch(id, { ...updates, updated_date: Date.now() });
  },
});

// Delete a blog post
export const remove = mutation({
  args: { token: v.optional(v.string()), id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token ?? null);
    await ctx.db.delete(args.id);
  },
});
