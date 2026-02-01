import React, { useState } from 'react';
import { useQuery, useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Mail, UserCheck, Clock, ShieldAlert, UserPlus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { isAdmin, isSuperAdmin } from '@/components/utils/security';

export default function AdminManagement() {
    const { token } = useAuth();
    const invitations = useQuery(api.invitations.list, { token: token ?? undefined });
    const admins = useQuery(api.users.listAdmins, { token: token ?? undefined });
    const currentUser = useQuery(api.users.viewer, { token: token ?? undefined });
    const inviteAdmin = useAction(api.invitations.inviteAdmin);
    const removeInvite = useMutation(api.invitations.remove);

    const [inviteEmail, setInviteEmail] = useState("");
    const [isInviting, setIsInviting] = useState(false);
    const [msg, setMsg] = useState(null);

    const handleInvite = async (e) => {
        e.preventDefault();
        setIsInviting(true);
        setMsg(null);
        try {
            await inviteAdmin({ email: inviteEmail, token: token ?? undefined });
            setMsg({ type: 'success', text: `Invitation sent to ${inviteEmail}` });
            setInviteEmail("");
        } catch (err) {
            console.error(err);
            setMsg({ type: 'error', text: err.message || "Failed to send invitation" });
        } finally {
            setIsInviting(false);
        }
    };

    const handleRemoveInvite = async (id) => {
        if (!window.confirm("Are you sure you want to delete this invitation?")) return;
        try {
            await removeInvite({ id, token: token ?? undefined });
        } catch (err) {
            console.error(err);
            alert("Failed to delete invitation: " + err.message);
        }
    };

    if (invitations === undefined || admins === undefined) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#1E3A5F]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Invite Form - Super Admin Only */}
                {isSuperAdmin(currentUser) && (
                    <Card className="md:col-span-1 shadow-sm border-t-4 border-t-[#C41E3A]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-[#C41E3A]" />
                                Invite Admin
                            </CardTitle>
                            <CardDescription>
                                Send an invitation link to a new administrator.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {msg && (
                                    <div className={`text-sm p-3 rounded-lg ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {msg.text}
                                    </div>
                                )}
                                <Button type="submit" className="w-full bg-[#1E3A5F] hover:bg-[#162B47]" disabled={isInviting}>
                                    {isInviting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                                    Send Invitation
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Current Admins - All Admins can see */}
                <Card className={`${isSuperAdmin(currentUser) ? 'md:col-span-2' : 'md:col-span-3'} shadow-sm`}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-green-600" />
                            Current Administrators
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-slate-500 font-medium text-left">
                                        <th className="pb-2">Name</th>
                                        <th className="pb-2">Email</th>
                                        <th className="pb-2">Role</th>
                                        <th className="pb-2">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin._id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                                            <td className="py-3 font-medium">{admin.name || "N/A"}</td>
                                            <td className="py-3 text-slate-600">{admin.email}</td>
                                            <td className="py-3">
                                                <Badge variant={admin.role === 'super_admin' ? 'default' : 'secondary'} className={admin.role === 'super_admin' ? 'bg-[#1E3A5F]' : ''}>
                                                    {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-slate-500 text-xs">
                                                {admin._creationTime ? format(new Date(admin._creationTime), 'MMM d, yyyy') : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List View */}
                        <div className="md:hidden space-y-4">
                            {admins.map((admin) => (
                                <div key={admin._id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-[#1E3A5F]">{admin.name || "N/A"}</p>
                                            <p className="text-sm text-slate-600 break-all">{admin.email}</p>
                                        </div>
                                        <Badge variant={admin.role === 'super_admin' ? 'default' : 'secondary'} className={admin.role === 'super_admin' ? 'bg-[#1E3A5F]' : ''}>
                                            {admin.role === 'super_admin' ? 'Super' : 'Admin'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                        Joined: {admin._creationTime ? format(new Date(admin._creationTime), 'MMM d, yyyy') : "N/A"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Invitations - Super Admin Only */}
            {isSuperAdmin(currentUser) && (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-500" />
                            Pending Invitations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {invitations.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 italic">
                                No pending invitations.
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-slate-500 font-medium text-left">
                                                <th className="pb-2">Invited Email</th>
                                                <th className="pb-2">Status</th>
                                                <th className="pb-2">Sent On</th>
                                                <th className="pb-2">Expires At</th>
                                                <th className="pb-2 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invitations.map((invite) => (
                                                <tr key={invite._id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 font-medium">{invite.email}</td>
                                                    <td className="py-3">
                                                        <Badge variant={invite.status === 'pending' ? 'outline' : 'secondary'} className={invite.status === 'pending' ? 'text-orange-600 border-orange-200' : ''}>
                                                            {invite.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-3 text-slate-500">
                                                        {format(new Date(invite.created_date), 'MMM d, p')}
                                                    </td>
                                                    <td className="py-3 text-slate-500">
                                                        {format(new Date(invite.expiresAt), 'MMM d, p')}
                                                        {invite.expiresAt < Date.now() && <span className="ml-2 text-red-500 text-xs font-bold">(Expired)</span>}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleRemoveInvite(invite._id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile List View */}
                                <div className="md:hidden space-y-4">
                                    {invitations.map((invite) => (
                                        <div key={invite._id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <p className="font-bold text-[#1E3A5F] break-all">{invite.email}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={invite.status === 'pending' ? 'outline' : 'secondary'} className={invite.status === 'pending' ? 'text-orange-600 border-orange-200' : 'text-xs'}>
                                                            {invite.status}
                                                        </Badge>
                                                        {invite.expiresAt < Date.now() && <span className="text-red-500 text-xs font-bold">Expired</span>}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-400 hover:text-red-600 p-0 h-8 w-8"
                                                    onClick={() => handleRemoveInvite(invite._id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                                                <div>
                                                    <p className="text-[9px] uppercase text-slate-400 font-bold">Sent On</p>
                                                    <p className="text-xs text-slate-600">{format(new Date(invite.created_date), 'MMM d, p')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase text-slate-400 font-bold">Expires</p>
                                                    <p className="text-xs text-slate-600">{format(new Date(invite.expiresAt), 'MMM d, p')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
