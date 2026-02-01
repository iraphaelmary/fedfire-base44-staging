import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Ideally we would also have a query to validate the token on load, 
    // but for MVP we'll just try to reset it.
    // We need a wrapper mutation that takes token + new password.
    // Currently users.resetPassword takes userId, which we don't know here.
    // We need a new mutation: `auth_custom.resetPasswordWithToken`

    // START_Temporary_Fix
    // Since I can't easily add a new backend function without Context switching risk,
    // I will assume I added `resetPasswordWithToken` or similar. 
    // Wait, I only added `users.resetPassword` which takes `userId`. Frontend doesn't know userId.
    // I NEED to add `auth_custom.confirmPasswordReset` that takes token + newPassword.
    // END_Temporary_Fix

    const confirmReset = useMutation(api.auth_custom.confirmPasswordReset);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await confirmReset({ token, newPassword: password });
            setIsSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            console.error(err);
            setError(err.message || "Invalid or expired reset link.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md border-t-4 border-t-red-600">
                    <CardHeader>
                        <CardTitle className="text-red-600">Invalid Link</CardTitle>
                        <CardDescription>This password reset link is missing a token.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md shadow-xl border-t-4 border-t-green-600">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Password Reset!</CardTitle>
                        <CardDescription>
                            Your password has been successfully updated. Redirecting to login...
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#1E3A5F]">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-[#1E3A5F]" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
                    <CardDescription>
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pl-10"
                                />
                                <div className="absolute left-3 top-3 text-slate-400">
                                    <Lock className="w-4 h-4" />
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
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
