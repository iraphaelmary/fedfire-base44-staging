import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, UserPlus, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const { login } = useAuth();
    const location = useLocation();
    const performSignUp = useAction(api.auth_custom.signUp);
    const verifyCode = useAction(api.auth_custom.verifyCode);
    const resendCode = useAction(api.auth_custom.resendCode);
    const hasAdmin = useQuery(api.users.hasAdmin);
    const registerFirstAdmin = useMutation(api.users.registerFirstAdmin);

    const [step, setStep] = useState("signup"); // "signup" | "verify"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [invitationToken, setInvitationToken] = useState(null);
    const [isInvited, setIsInvited] = useState(false);
    const verifyInvitation = useQuery(api.invitations.verify, invitationToken ? { token: invitationToken } : "skip");

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get("token");
        const emailParam = params.get("email");

        if (tokenParam) {
            setInvitationToken(tokenParam);
        }
        if (emailParam) {
            setEmail(emailParam);
        }

        if (params.get("verify") === "true") {
            setStep("verify");
        }
    }, [location]);

    useEffect(() => {
        if (verifyInvitation?.valid) {
            setIsInvited(true);
            if (verifyInvitation.email) setEmail(verifyInvitation.email);
        } else if (verifyInvitation?.valid === false && invitationToken) {
            setError(verifyInvitation.error || "This invitation is invalid or has expired.");
        }
    }, [verifyInvitation, invitationToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validation for public registration
        if (hasAdmin && !invitationToken) {
            setError("Public registration is currently disabled. You need an invitation link to create an account.");
            setIsLoading(false);
            return;
        }

        try {
            await performSignUp({ email, password, name, invitationToken: invitationToken || undefined });
            setStep("verify");
            setCountdown(60);
        } catch (err) {
            console.error(err);
            const msg = err.message || "";
            if (msg.includes("User already exists")) {
                setError("An account with this email already exists. Try signing in.");
            } else if (msg.includes("invitation")) {
                setError(msg);
            } else {
                setError("We couldn't create your account. Please check your details and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await verifyCode({ email, code: verificationCode });
            const token = result.token;

            // Always attempt to register as first admin; the mutation handles the check
            try {
                await registerFirstAdmin({ token });
            } catch (adminErr) {
                // Ignore if it fails (likely because an admin already exists)
            }

            login(token);
        } catch (err) {
            console.error(err);
            const msg = err.message || "";
            if (msg.includes("Could not find public function")) {
                setError("Configuration Error: Verification functions not found. Please ensure 'npx convex dev' is running.");
            } else {
                setError("Verification failed. Please check the code and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;
        setIsResending(true);
        setError(null);
        setSuccessMsg(null);
        try {
            await resendCode({ email });
            setSuccessMsg("A new 6-digit code has been sent to your email.");
            setCountdown(60);
        } catch (err) {
            console.error(err);
            const msg = err.message || "";
            if (msg.includes("Could not find public function")) {
                setError("Configuration Error: Resend function not found. Please ensure 'npx convex dev' is running.");
            } else {
                setError("We couldn't resend the code. Please try again in a moment.");
            }
        } finally {
            setIsResending(false);
        }
    };

    if (hasAdmin === undefined || (invitationToken && verifyInvitation === undefined)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#C41E3A] mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Preparing secure registration...</p>
                </div>
            </div>
        );
    }

    // Restriction UI: Admin exists but no valid invitation
    if (hasAdmin && (!invitationToken || verifyInvitation?.valid === false)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#C41E3A]">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-50">
                                <Shield className="w-8 h-8 text-[#C41E3A]" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#1E3A5F]">
                            Access Denied
                        </CardTitle>
                        <CardDescription>
                            Invitation required to create an account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200 text-left">
                            <AlertDescription>
                                {invitationToken && verifyInvitation?.valid === false
                                    ? (verifyInvitation.error || "This invitation link is invalid or has expired.")
                                    : "Unauthorized access: You must use a valid invitation link from an administrator."}
                            </AlertDescription>
                        </Alert>
                        <p className="text-sm text-slate-500">
                            If you believe this is an error, please contact the system administrator.
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button asChild variant="outline" className="w-full">
                            <Link to="/login">Go to Login</Link>
                        </Button>
                        <Link to="/" className="text-sm text-slate-400 hover:text-[#1E3A5F]">
                            Return to Home
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#C41E3A]">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-50">
                            {step === "signup" ? (
                                <UserPlus className="w-8 h-8 text-[#C41E3A]" />
                            ) : (
                                <Mail className="w-8 h-8 text-[#C41E3A]" />
                            )}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {step === "signup" ? "Create Account" : "Verify Email"}
                    </CardTitle>
                    <CardDescription>
                        {step === "signup"
                            ? "Join the Federal Fire Service portal"
                            : `We've sent a 6-digit code to ${email}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === "signup" ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                    <div className="absolute left-3 top-3 text-slate-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10"
                                        readOnly={isInvited}
                                    />
                                    <div className="absolute left-3 top-3 text-slate-400">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 pr-10"
                                    />
                                    <div className="absolute left-3 top-3 text-slate-400">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full bg-[#C41E3A] hover:bg-[#A01830]" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-center block">Verification Code</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                    required
                                    className="text-center text-2xl tracking-[1em] font-bold h-14"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {successMsg && (
                                <Alert className="bg-green-50 text-green-700 border-green-200">
                                    <AlertDescription>{successMsg}</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full bg-[#C41E3A] hover:bg-[#A01830] transition-colors" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Continue"
                                )}
                            </Button>

                            <div className="text-center pt-2">
                                <p className="text-sm text-slate-500 mb-2">Didn't receive the code?</p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResending || countdown > 0}
                                    className="text-sm text-[#C41E3A] hover:text-[#A01830] font-bold disabled:opacity-50 transition-colors"
                                >
                                    {isResending ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Resending...
                                        </span>
                                    ) : (
                                        countdown > 0
                                            ? `Resend available in ${countdown}s`
                                            : "Resend Code"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#C41E3A] font-bold hover:underline">
                            Login
                        </Link>
                    </div>
                    {step === "verify" && (
                        <button
                            type="button"
                            onClick={() => {
                                setStep("signup");
                                setError(null);
                                setSuccessMsg(null);
                            }}
                            className="text-sm text-slate-500 hover:text-[#C41E3A] font-medium"
                        >
                            ← Back to registration
                        </button>
                    )}
                    <Link
                        to="/"
                        className="text-sm text-slate-500 hover:text-[#1E3A5F] flex items-center justify-center gap-2 transition-colors"
                    >
                        <span>Return to Home</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
