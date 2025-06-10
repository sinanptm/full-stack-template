import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Package, Server } from 'lucide-react';

const Architecture = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Server className="h-5 w-5" />
                            Backend Architecture Layers
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-3">
                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-blue-600">🏛️ Domain Layer (Core Business Logic)</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>entities/</code> - Pure business objects (User, Admin, OTP)</li>
                                    <li>• <code>interfaces/</code> - Contracts for external dependencies</li>
                                </ul>
                            </div>

                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-green-600">⚙️ Use Case Layer (Application Logic)</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>admin/</code> - Admin management operations</li>
                                    <li>• <code>user/</code> - User operations (Auth, profile)</li>
                                </ul>
                            </div>

                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-orange-600">🔧 Infrastructure Layer (Implementation)</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>database/</code> - MongoDB implementations</li>
                                    <li>• <code>services/</code> - External service implementations</li>
                                </ul>
                            </div>

                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-purple-600">🌐 Presentation Layer (External Interface)</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>routes/</code> - API route definitions</li>
                                    <li>• <code>controllers/</code> - Request/response handling</li>
                                    <li>• <code>middleware/</code> - HTTP-specific middleware</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Globe className="h-5 w-5" />
                            Frontend Architecture
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-3">
                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-blue-600">🎨 Component Architecture</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>app/</code> - App router structure</li>
                                    <li>• <code>components/</code> - Reusable React components</li>
                                    <li>• <code>hooks/</code> - Custom React hooks</li>
                                </ul>
                            </div>

                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-green-600">📁 Directory Structure</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>(user)/</code> - User dashboard and features</li>
                                    <li>• <code>(admin)/</code> - Admin dashboard and tools</li>
                                    <li>• <code>ui/</code> - Low-level UI components</li>
                                    <li>• <code>forms/</code> - Composable form elements</li>
                                </ul>
                            </div>

                            <div className="border rounded-lg p-3">
                                <h4 className="font-semibold text-orange-600">🛠️ Utilities & Config</h4>
                                <ul className="text-xs md:text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>• <code>lib/</code> - Utility functions and helpers</li>
                                    <li>• <code>types/</code> - TypeScript types and interfaces</li>
                                    <li>• <code>constants/</code> - Constant values and enums</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Package className="h-5 w-5" />
                        Dependency Injection & IoC Container
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                        The application uses Inversify for dependency injection, providing loose coupling and easy testing.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <div className="border rounded-lg p-2 md:p-3">
                            <h4 className="font-semibold text-blue-600 text-sm md:text-base">Controllers</h4>
                            <p className="text-xs text-muted-foreground">Request handlers</p>
                        </div>
                        <div className="border rounded-lg p-2 md:p-3">
                            <h4 className="font-semibold text-green-600 text-sm md:text-base">Use Cases</h4>
                            <p className="text-xs text-muted-foreground">Business logic</p>
                        </div>
                        <div className="border rounded-lg p-2 md:p-3">
                            <h4 className="font-semibold text-orange-600 text-sm md:text-base">Services</h4>
                            <p className="text-xs text-muted-foreground">External integrations</p>
                        </div>
                        <div className="border rounded-lg p-2 md:p-3">
                            <h4 className="font-semibold text-purple-600 text-sm md:text-base">Repositories</h4>
                            <p className="text-xs text-muted-foreground">Data access</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Architecture);
