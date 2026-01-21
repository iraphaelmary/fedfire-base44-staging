import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const q = args.status
      ? ctx.db.query("contactMessages").withIndex("by_status", (q) => q.eq("status", args.status!))
      : ctx.db.query("contactMessages");
    
    return await q.order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactMessages", {
      ...args,
      status: "new",
      created_date: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contactMessages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("contactMessages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
