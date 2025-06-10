import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackendFolder from "./BackendFolder";

const Backend = () => {
    return (
        <div className="space-y-6">
            <BackendFolder />

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🛡️ Security Features</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-green-600 text-sm md:text-base">JWT Authentication</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Access & refresh tokens with automatic refresh</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-blue-600 text-sm md:text-base">HTTP-Only Cookies</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Secure token storage preventing XSS attacks</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-orange-600 text-sm md:text-base">Rate Limiting</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Protection against brute force attacks</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-purple-600 text-sm md:text-base">Password Hashing</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">bcrypt with 10 rounds for secure storage</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-red-600 text-sm md:text-base">Input Validation</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Comprehensive Joi schemas for all endpoints</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-indigo-600 text-sm md:text-base">CORS Protection</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Configured origins and credentials handling</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Backend);
