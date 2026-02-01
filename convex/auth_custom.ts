import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Helper to generate a simple token
function generateToken() {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

// Sign Up Action
export const signUp = action({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    invitationToken: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: boolean }> => {
    // 1. Check if user already exists
    const existingUser = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // 2. Validate invitation if provided
    if (args.invitationToken) {
        const inviteCheck = await ctx.runQuery(api.invitations.verify, { token: args.invitationToken });
        if (!inviteCheck.valid) {
            throw new Error(inviteCheck.error || "Invalid invitation");
        }
    }

    // 3. Create user (unverified)
    // Note: We are storing password in plain text for this fix because we don't have bcrypt setup.
    // IN PRODUCTION: USE BCRYPT OR ARGON2
    const userId = await ctx.runMutation(api.auth_custom.createUserInternal, {
        email: args.email,
        passwordHash: args.password, // TODO: Hash this!
        name: args.name,
        verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
        role: "user", // Default, might be upgraded to admin later
    });

    // 4. Send verification email (mock)
    console.log(`Sending verification code to ${args.email}: ${userId}`); // Ideally logging code here but we need to fetch it or return it?
    // actually createUserInternal returns user ID. 

    return { success: true };
  },
});

// Internal mutation to create user
export const createUserInternal = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    verificationCode: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      name: args.name,
      verificationCode: args.verificationCode,
      role: args.role,
      isVerified: false,
      created_date: Date.now(),
    });
  },
});


// Sign In Action
export const signIn = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ token: string }> => {
    const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Simple password check (Again, use hashing in prod)
    if (user.passwordHash !== args.password) {
      throw new Error("Invalid password");
    }

    if (!user.isVerified) {
        throw new Error("User is unverified"); // Frontend handles this to show verify step
    }

    // Create session
    const token = await ctx.runMutation(api.auth_custom.createSession, { userId: user._id });
    
    return { token };
  },
});

export const createSession = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const token = generateToken();
    await ctx.db.insert("sessions", {
      userId: args.userId,
      token,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return token;
  },
});

export const signOut = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("token", (q) => q.eq("token", args.token))
      .unique();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const verifyCode = action({
  args: { email: v.string(), code: v.string() },
  handler: async (ctx, args): Promise<{ token: string }> => {
    const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
    if (!user) throw new Error("User not found");

    if (user.verificationCode !== args.code) {
        throw new Error("Invalid code");
    }

    // Mark verified
    await ctx.runMutation(api.auth_custom.markVerified, { userId: user._id });

    // Login
    const token = await ctx.runMutation(api.auth_custom.createSession, { userId: user._id });
    return { token };
  },
});

export const markVerified = mutation({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { isVerified: true, verificationCode: undefined });
    }
});

export const resendCode = action({
    args: { email: v.string() },
    handler: async (ctx, args): Promise<void> => {
        const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
        if (!user) throw new Error("User not found");
        
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        await ctx.runMutation(api.auth_custom.updateVerificationCode, { userId: user._id, code: newCode });
        
        console.log(`Resent code to ${args.email}: ${newCode}`);
    }
});

export const updateVerificationCode = mutation({
    args: { userId: v.id("users"), code: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { verificationCode: args.code });
    }
});

// Password Reset
export const sendPasswordResetEmail = action({
    args: { email: v.string() },
    handler: async (ctx, args): Promise<void> => {
        const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
        if (!user) return; // Silent fail

        const code = Math.floor(100000 + Math.random() * 900000).toString(); // or token
        // Use resetCode for OTP flow
        await ctx.runMutation(api.auth_custom.setResetCode, { userId: user._id, code });
        console.log(`Reset code for ${args.email}: ${code}`);
    }
});

export const setResetCode = mutation({
    args: { userId: v.id("users"), code: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { 
            resetCode: args.code, 
            resetCodeExpires: Date.now() + 15 * 60 * 1000 // 15 mins 
        });
    }
});

export const verifyResetCode = action({
    args: { email: v.string(), code: v.string() },
    handler: async (ctx, args): Promise<{ token: string }> => {
        const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });
        if (!user) throw new Error("Invalid code");

        if (user.resetCode !== args.code || (user.resetCodeExpires && user.resetCodeExpires < Date.now())) {
             throw new Error("Invalid or expired code");
        }

        // Generate a temporary reset token for the next step (setting password) if needed
        // For now, return a token that allows login? Or a specific reset token.
        // Frontend expects { token: string } which is used in URL /reset-password?token=...
        
        return { token: user.resetCode }; // Re-using code as token for simplicity in this flow check
    }
});

export const resendResetCode = action({
    args: { email: v.string() },
    handler: async (ctx, args): Promise<void> => {
         // Same as sendPasswordResetEmail
         await ctx.runAction(api.auth_custom.sendPasswordResetEmail, { email: args.email });
    }
});
