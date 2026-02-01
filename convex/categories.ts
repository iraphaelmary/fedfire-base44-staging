import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./permissions";

export const list = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const create = mutation({
  args: {
    token: v.optional(v.string()),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token ?? null);
    return await ctx.db.insert("categories", args);
  },
});

export const update = mutation({
  args: {
    token: v.optional(v.string()),
    id: v.id("categories"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token ?? null);
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { token: v.optional(v.string()), id: v.id("categories") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token ?? null);
    await ctx.db.delete(args.id);
  },
});
