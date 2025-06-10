import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Frontend = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl">🎨 UI Components</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Shadcn/ui Components</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Modern, accessible UI components with Tailwind CSS</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Custom Form Elements</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Reusable form components with validation</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Loading States</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Global loading overlay with Framer Motion</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Responsive Design</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Mobile-first approach with Tailwind breakpoints</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl">🔄 State Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Zustand Stores</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Lightweight state management for auth and UI state</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">React Query</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Server state management with caching and synchronization</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">Local Storage</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Persistent auth state with hydration handling</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🎯 Custom Hooks</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-blue-600 text-sm md:text-base">Authentication Hooks</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• useAuthUser</li>
                                <li>• useAuthAdmin</li>
                                <li>• useSignin</li>
                                <li>• useSignup</li>
                            </ul>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-green-600 text-sm md:text-base">API Hooks</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• useGetProfile</li>
                                <li>• useUpdateProfile</li>
                                <li>• useVerifyOtp</li>
                                <li>• useResetPassword</li>
                            </ul>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-orange-600 text-sm md:text-base">Utility Hooks</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                <li>• useLoading</li>
                                <li>• useMailSetter</li>
                                <li>• useAuthRedirectToast</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Frontend);
