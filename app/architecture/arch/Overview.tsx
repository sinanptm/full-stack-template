import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Layers, Lock, Settings, Shield, Users, Zap } from "lucide-react";

const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Layers className="h-4 w-4 md:h-5 md:w-5" />
                            Clean Architecture
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            Domain-driven structure makes adding/removing features effortless with clear separation of concerns.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Settings className="h-4 w-4 md:h-5 md:w-5" />
                            Highly Customizable
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            Modular components and services for easy adaptation to your specific needs.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Shield className="h-4 w-4 md:h-5 md:w-5" />
                            Complete Authentication
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            Email/Password with OTP verification, OAuth (Google, GitHub), and Admin authentication.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Users className="h-4 w-4 md:h-5 md:w-5" />
                            Role-Based Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            Secure user and admin roles with protected routes and middleware.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Zap className="h-4 w-4 md:h-5 md:w-5" />
                            Modern Tech Stack
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            Next.js 15, Express.js 5, MongoDB, TypeScript, Firebase OAuth for cutting-edge development.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                            <Lock className="h-4 w-4 md:h-5 md:w-5" />
                            Security-First
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            JWT tokens, HTTP-only cookies, rate limiting, bcrypt hashing, and comprehensive validation.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">🎯 Why This Template is Perfect for Customization</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-sm md:text-base">🏛️ Clean Architecture Benefits</h4>
                        <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                            <li>
                                • <strong>Separation of Concerns:</strong> Each layer has a single responsibility
                            </li>
                            <li>
                                • <strong>Dependency Inversion:</strong> Abstractions don't depend on details
                            </li>
                            <li>
                                • <strong>Testable Code:</strong> Business logic is independent of frameworks
                            </li>
                            <li>
                                • <strong>Framework Independence:</strong> Core logic isn't tied to Express.js or Next.js
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2 text-sm md:text-base">🔄 Easy Feature Management</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                            <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Add new user role → Add entity + use case + controller</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Different OAuth provider → Implement new service</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Switch database → Replace repository implementation</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Add notifications → Create new service and inject</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Overview);
