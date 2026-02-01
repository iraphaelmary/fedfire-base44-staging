import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useAction, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, UserPlus, LogIn, Shield, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // API Actions/Queries
    const performSignIn = useAction(api.auth_custom.signIn);
    const performSignUp = useAction(api.auth_custom.signUp);
    const convex = useConvex();
    const verifyCodeAction = useAction(api.auth_custom.verifyCode);
    const resendCodeAction = useAction(api.auth_custom.resendCode);
    const hasAdmin = useQuery(api.users.hasAdmin);

    // Form State
    const [step, setStep] = useState("login"); // "login" | "register" | "verify"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [invitationToken, setInvitationToken] = useState(null);
    const [isValidInvitation, setIsValidInvitation] = useState(false);

    // Invitation Check
    const verifiedInvite = useQuery(api.invitations.verify, invitationToken ? { token: invitationToken } : "skip");

    // Initialization: Detect Token & Step from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const emailParam = params.get("email");
        const verifyParam = params.get("verify") === "true";

        if (token) setInvitationToken(token);
        if (emailParam) setEmail(emailParam);
        if (verifyParam) setStep("verify");

        // ONLY redirect to admin if logged in AND NOT on a specific flow (invite/verify)
        if (isAuthenticated && !token && !verifyParam) {
            navigate("/admin");
        }
    }, [location, isAuthenticated, navigate]);

    // Handle Invitation Validation Result
    useEffect(() => {
        if (verifiedInvite?.valid) {
            setIsValidInvitation(true);
            if (verifiedInvite.email) setEmail(verifiedInvite.email);
            setStep("register");
        } else if (verifiedInvite?.valid === false && invitationToken) {
            setError(verifiedInvite.error || "This invitation link is invalid or has expired.");
        }
    }, [verifiedInvite, invitationToken]);

    // Auto-detect first admin bootstrapping state
    useEffect(() => {
        if (hasAdmin === false && step === "login" && !invitationToken) {
            setStep("register");
            setName("Initial Admin");
        }
    }, [hasAdmin, step, invitationToken]);

    const getFriendlyErrorMessage = (err) => {
        const msg = err.message || err.toString();
        if (msg.includes("User not found")) return "No account found. If you were invited, please use your invitation link.";
        if (msg.includes("Invalid password")) return "Incorrect password. Please try again.";
        if (msg.includes("Invitation token is required") || msg.includes("ACCESS_DENIED")) return "ACCESS DENIED: You need an invitation to create an account.";
        if (msg.includes("already exists")) return "An account with this email already exists.";
        return msg;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const normalizedEmail = email.toLowerCase();
        setIsLoading(true);
        setError(null);

        try {
            const result = await performSignIn({ email: normalizedEmail, password });
            login(result.token);
        } catch (err) {
            console.error("Login failed:", err);
            const msg = err.message || "";

            // If user not found, check if they are the first admin or have an invitation
            if (msg.includes("User not found")) {
                if (hasAdmin === false) {
                    setStep("register");
                    setName("Admin");
                } else {
                    // Check if invited manually
                    setIsLoading(true);
                    const invite = await convex.query(api.invitations.verifyEmail, { email: normalizedEmail });
                    if (invite.invited) {
                        setStep("register");
                        setInvitationToken(invite.token);
                    } else {
                        setError("ACCESS DENIED: You need an invitation to create an account.");
                    }
                }
            } else if (msg.includes("unverified")) {
                setStep("verify");
            } else {
                setError(getFriendlyErrorMessage(err));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const normalizedEmail = email.toLowerCase();
        setIsLoading(true);
        setError(null);

        try {
            await performSignUp({
                email: normalizedEmail,
                password,
                name: name || "Admin",
                invitationToken: invitationToken || undefined
            });
            setStep("verify");
        } catch (err) {
            console.error("Registration failed:", err);
            setError(getFriendlyErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { token } = await verifyCodeAction({ email, code: verificationCode });
            login(token);
        } catch (err) {
            console.error("Verification failed:", err);
            setError(err.message || "Invalid verification code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            await resendCodeAction({ email });
            alert("New verification code sent!");
        } catch (err) {
            setError("Failed to resend code: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- RENDER HELPERS ---

    const renderHeader = () => {
        let icon = <LogIn className="w-8 h-8 text-[#C41E3A]" />;
        let title = "Welcome Back";
        let desc = "Enter your credentials to access your account";
        let color = "bg-red-50";

        if (step === "register") {
            icon = <UserPlus className="w-8 h-8 text-[#1E3A5F]" />;
            title = hasAdmin === false ? "Setup Portal" : "Complete Registration";
            desc = hasAdmin === false ? "Create the first administrator account" : "Join the Federal Fire Service portal";
            color = "bg-blue-50";
        } else if (step === "verify") {
            icon = <Mail className="w-8 h-8 text-orange-500" />;
            title = "Verify Your Email";
            desc = `Enter the 6-digit code sent to ${email}`;
            color = "bg-orange-50";
        }

        return (
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
                        {icon}
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#C41E3A]">
                {renderHeader()}

                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200 mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {step === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10" />
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 pr-10" />
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#1E3A5F] hover:bg-[#162B47]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                                Sign In
                            </Button>
                        </form>
                    )}

                    {step === "register" && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reg-email">Email Address</Label>
                                <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isValidInvitation} className={isValidInvitation ? "bg-slate-50" : ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10" />
                                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-password">Set Password</Label>
                                <div className="relative">
                                    <Input id="reg-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10" />
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#1E3A5F] hover:bg-[#162B47]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                                {hasAdmin === false ? "Initialize & Register" : "Complete Registration"}
                            </Button>
                        </form>
                    )}

                    {step === "verify" && (
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2 text-center">
                                <Label className="block text-sm font-medium">6-Digit Verification Code</Label>
                                <Input
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                    maxLength={6}
                                    className="text-center text-3xl tracking-[0.5em] font-bold h-16 border-2 focus:border-[#C41E3A]"
                                    autoFocus
                                />
                                <p className="text-xs text-slate-400 mt-2">Check your email or terminal for the code.</p>
                            </div>
                            <Button type="submit" className="w-full bg-[#C41E3A] hover:bg-[#A01830]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Verify & Sign In"}
                            </Button>
                            <button type="button" onClick={handleResend} className="w-full text-center text-sm font-bold text-[#1E3A5F] hover:underline">
                                Resend verification code
                            </button>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4 border-t pt-6">
                    {step !== "login" && (
                        <button onClick={() => setStep("login")} className="text-sm text-slate-500 hover:text-[#C41E3A] font-medium">
                            ← Back to Login
                        </button>
                    )}
                    <Link to="/" className="text-sm text-slate-400 hover:text-[#1E3A5F] transition-colors">
                        Return to Website
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
