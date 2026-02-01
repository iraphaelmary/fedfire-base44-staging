import { QueryCtx } from "./_generated/server";

export async function requireAdmin(ctx: QueryCtx, token: string | null) {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const session = await ctx.db
    .query("sessions")
    .withIndex("token", (q) => q.eq("token", token))
    .unique();

  if (!session) {
    throw new Error("Unauthorized: Invalid token");
  }

  if (session.expiresAt < Date.now()) {
    throw new Error("Unauthorized: Session expired");
  }

  const user = await ctx.db.get(session.userId);

  if (!user) {
    throw new Error("Unauthorized: User not found");
  }

  if (user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}
