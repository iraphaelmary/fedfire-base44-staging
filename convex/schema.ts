import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    published: v.boolean(),
    is_featured: v.optional(v.boolean()),
    author_id: v.optional(v.string()),
    created_date: v.number(),
    updated_date: v.optional(v.number()),
  })
    .index("by_published", ["published"])
    .index("by_category", ["category"])
    .index("by_slug", ["slug"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  })
    .index("by_slug", ["slug"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    status: v.string(), // "new" | "read" | "replied"
    created_date: v.number(),
  })
    .index("by_status", ["status"]),

  users: defineTable({
    tokenIdentifier: v.string(), // This will be the JWT's 'sub' or similar unique ID
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    role: v.string(), // "user" | "admin"
    created_date: v.number(),
  })
    .index("by_token", ["tokenIdentifier"]),
});
