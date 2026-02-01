import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

export function LogoutConfirmation({ isOpen, onClose, onConfirm }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-white border-red-100 border-2">
                <AlertDialogHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <AlertDialogTitle className="text-center text-xl text-[#1E3A5F]">Sign Out?</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-slate-500">
                        Are you sure you want to sign out of your account? You will need to log in again to access your dashboard.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
                    <AlertDialogCancel className="w-full sm:w-auto mt-0 border-slate-200">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        Sign Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
