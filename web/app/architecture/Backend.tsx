import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Backend = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl">🔧 Core Services</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">TokenService</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">JWT creation and validation with refresh token support</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">HashService</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Password hashing and comparison using bcrypt</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">MailService</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Email sending with templated OTP and reset links</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">OAuthService</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Firebase OAuth token verification</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">ValidatorService</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Comprehensive input validation using Joi</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl">📊 Data Layer</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">UserRepository</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">User CRUD operations with credential filtering</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">OtpRepository</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">OTP storage and verification management</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <h4 className="font-semibold text-sm md:text-base">MongoDB Models</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">Mongoose schemas with validation and indexing</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

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

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🧪 Testing Strategy</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                        Comprehensive test suite with mocked dependencies for isolated unit testing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2 text-sm md:text-base">Test Coverage</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                                <li>• Authentication use cases</li>
                                <li>• Password reset flows</li>
                                <li>• OAuth integration</li>
                                <li>• OTP verification</li>
                                <li>• Error handling</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-sm md:text-base">Mock Strategy</h4>
                            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                                <li>• Repository mocks</li>
                                <li>• Service mocks</li>
                                <li>• External API mocks</li>
                                <li>• Database mocks</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Backend);
