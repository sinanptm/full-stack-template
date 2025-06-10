import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from 'lucide-react';

const AuthFlow = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🔐 Complete Authentication System Flow</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Comprehensive authentication supporting multiple methods with security best practices
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-blue-600">📧 Email/Password Flow</h4>
                            <div className="space-y-2 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User enters credentials</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Server validates and generates OTP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>OTP sent via email</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User verifies OTP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>JWT tokens generated</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>HTTP-only cookies set</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-green-600">🔥 OAuth Flow</h4>
                            <div className="space-y-2 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Firebase OAuth popup</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Provider authentication</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Firebase token received</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Server validates Firebase token</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User created/updated</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>JWT tokens generated</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-orange-600">🔄 Password Reset Flow</h4>
                            <div className="space-y-2 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User requests password reset</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>OTP generated and stored</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Reset link with OTP sent</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User clicks link (5min expiry)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>New password set</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>OTP cleaned up</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-purple-600">👑 Admin Authentication</h4>
                            <div className="space-y-2 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Admin credentials from .env</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Direct validation (no OTP)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Admin role JWT generated</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>Admin panel access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                    <span>User management capabilities</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🛡️ Security Measures</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-red-600 text-sm md:text-base">Token Security</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• 5-minute access token expiry</li>
                                <li>• 7-day refresh token expiry</li>
                                <li>• Automatic token refresh</li>
                                <li>• HTTP-only cookie storage</li>
                            </ul>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-blue-600 text-sm md:text-base">OTP Security</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• 15-minute OTP expiry</li>
                                <li>• Single-use OTP tokens</li>
                                <li>• Automatic cleanup</li>
                                <li>• Rate limiting on generation</li>
                            </ul>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-green-600 text-sm md:text-base">Account Protection</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• Account blocking capability</li>
                                <li>• Role-based access control</li>
                                <li>• Session invalidation</li>
                                <li>• Secure logout</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(AuthFlow);
