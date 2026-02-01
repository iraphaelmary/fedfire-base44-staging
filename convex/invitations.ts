import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Verify invitation token
export const verify = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const invitation = await ctx.db
      .query("invitations")
      .withIndex("token", (q) => q.eq("token", args.token))
      .unique();

    if (!invitation) {
      return { valid: false, error: "Invalid invitation token" };
    }

    if (invitation.expiresAt < Date.now()) {
      return { valid: false, error: "Invitation expired" };
    }

    if (invitation.status !== "pending") {
      return { valid: false, error: "Invitation already used or expired" };
    }

    return { valid: true, email: invitation.email };
  },
});

// Verify if email has a pending invitation
export const verifyEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const invitation = await ctx.db
      .query("invitations")
      .withIndex("email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    if (!invitation) {
      return { invited: false };
    }

    if (invitation.expiresAt < Date.now()) {
        return { invited: false };
    }

    return { invited: true, token: invitation.token };
  },
});
