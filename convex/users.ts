import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const viewer = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) {
      return null;
    }

    const session = await ctx.db
      .query("sessions")
      .withIndex("token", (q) => q.eq("token", args.token!))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    return await ctx.db.get(session.userId);
  },
});

export const hasAdmin = query({
  args: {},
  handler: async (ctx) => {
    const admin = await ctx.db
      .query("users")
      .withIndex("role", (q) => q.eq("role", "admin"))
      .first();
    return !!admin;
  },
});

export const registerFirstAdmin = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    // This is called AFTER specific signup action that returns a token
    // We verify the token belongs to a user, and if they are the first user, make them admin
    
    const session = await ctx.db
      .query("sessions")
      .withIndex("token", (q) => q.eq("token", args.token))
      .unique();

    if (!session) throw new Error("Invalid session");

    const user = await ctx.db.get(session.userId);
    if (!user) throw new Error("User not found");

    // Check if any other admin exists
    const existingAdmin = await ctx.db
      .query("users")
      .withIndex("role", (q) => q.eq("role", "admin"))
      .first();

    if (!existingAdmin) {
      await ctx.db.patch(user._id, { role: "admin", isVerified: true });
    }
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .unique();
  },
});
