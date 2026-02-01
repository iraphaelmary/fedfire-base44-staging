import React, { useState, useEffect } from 'react';
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft, KeyRound, AlertCircle, RefreshCw } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("EMAIL"); // EMAIL | OTP
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resendTimer, setResendTimer] = useState(0); // Seconds
    const navigate = useNavigate();

    const sendResetEmail = useAction(api.auth_custom.sendPasswordResetEmail);
    const verifyResetCode = useAction(api.auth_custom.verifyResetCode);
    const resendResetCode = useAction(api.auth_custom.resendResetCode);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await sendResetEmail({ email });
            setStep("OTP");
            setResendTimer(60); // Start 60s countdown
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await verifyResetCode({ email, code: otp });
            navigate(`/reset-password?token=${result.token}`);
        } catch (err) {
            console.error(err);
            setError("Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        setIsLoading(true);
        setError(null);
        try {
            await resendResetCode({ email });
            setResendTimer(60);
        } catch (err) {
            console.error(err);
            setError("Failed to resend code.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#1E3A5F]">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            {step === "EMAIL" ? (
                                <Mail className="w-8 h-8 text-[#1E3A5F]" />
                            ) : (
                                <KeyRound className="w-8 h-8 text-[#1E3A5F]" />
                            )}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {step === "EMAIL" ? "Forgot Password?" : "Verify Code"}
                    </CardTitle>
                    <CardDescription>
                        {step === "EMAIL"
                            ? "Enter your email for a verification code."
                            : `Enter the 6-digit code sent to ${email}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === "EMAIL" ? (
                        <form onSubmit={handleSendEmail} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                    <div className="absolute left-3 top-3 text-slate-400">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="ml-2">{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-[#1E3A5F] hover:bg-[#162B47]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                                ) : "Send Code"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Verification Code</Label>
                                <div className="relative">
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder="123456"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        className="pl-10 text-center tracking-widest text-lg font-bold"
                                        maxLength={6}
                                    />
                                    <div className="absolute left-3 top-3 text-slate-400">
                                        <KeyRound className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="ml-2">{error}</AlertDescription>
                                </Alert>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-[#1E3A5F] hover:bg-[#162B47]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
                                ) : "Verify Code"}
                            </Button>

                            <div className="space-y-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleResend}
                                    disabled={resendTimer > 0 || isLoading}
                                    className="w-full border-slate-200 text-slate-600 hover:text-[#1E3A5F]"
                                >
                                    {resendTimer > 0 ? (
                                        <>Resend Code in {resendTimer}s</>
                                    ) : (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4" /> Resend Code
                                        </>
                                    )}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setStep("EMAIL")}
                                    className="w-full text-sm text-center text-slate-500 hover:text-slate-900 hover:underline"
                                >
                                    Use a different email
                                </button>
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link
                        to="/login"
                        className="text-sm text-slate-500 hover:text-[#1E3A5F] flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
