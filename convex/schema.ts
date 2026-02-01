import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  // ...authTables, // Removed for custom auth
  users: defineTable({
    email: v.string(),
    passwordHash: v.optional(v.string()), // Made optional for migration
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.optional(v.string()), // "user" | "admin"
    isVerified: v.optional(v.boolean()),
    verificationCode: v.optional(v.string()),
    resetToken: v.optional(v.string()),
    resetTokenExpires: v.optional(v.number()),
    resetCode: v.optional(v.string()),
    resetCodeExpires: v.optional(v.number()),
    created_date: v.optional(v.number()),
  }).index("email", ["email"])
    .index("role", ["role"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  }).index("token", ["token"]),

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
    author: v.optional(v.string()),
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

  invitations: defineTable({
    email: v.string(),
    token: v.string(),
    invitedBy: v.id("users"),
    status: v.string(), // "pending" | "accepted" | "expired"
    expiresAt: v.number(),
    created_date: v.number(),
  })
    .index("email", ["email"])
    .index("token", ["token"]),
});
