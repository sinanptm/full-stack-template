"use client";

import { memo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/app/architecture/arch/Footer";
import Overview from "@/app/architecture/arch/Overview";
import Backend from "@/app/architecture/arch/Backend";
import Frontend from "@/app/architecture/arch/Frontend";
import AuthFlow from "@/app/architecture/arch/AuthFlow";
import TechStack from "@/app/architecture/arch/TechStack";
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Testing from "@/app/architecture/arch/Testing";

const ArchitecturePage = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const tabItems = [
        { value: "overview", label: "Overview" },
        { value: "backend", label: "Backend" },
        { value: "testing", label: "Testing" },
        { value: "frontend", label: "Frontend" },
        { value: "auth-flow", label: "Auth Flow" },
        { value: "tech-stack", label: "Tech Stack" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview": return <Overview />;
            case "backend": return <Backend />;
            case "testing": return <Testing />;
            case "frontend": return <Frontend />;
            case "auth-flow": return <AuthFlow />;
            case "tech-stack": return <TechStack />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            🚀 Full-Stack Authentication Template
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Production-ready full-stack template with clean architecture and complete authentication system
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-6">
                            <Badge variant="secondary">Next.js 15.3.2</Badge>
                            <Badge variant="secondary">Express.js 5.1.0</Badge>
                            <Badge variant="secondary">MongoDB</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Firebase OAuth</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 md:py-8">
                {isMobile ? (
                    <div className="mb-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full flex items-center justify-between p-3 border rounded-md">
                                <span className="font-medium">{tabItems.find(tab => tab.value === activeTab)?.label}</span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full" align="start">
                                {tabItems.map((tab) => (
                                    <DropdownMenuItem
                                        key={tab.value}
                                        onClick={() => setActiveTab(tab.value)}
                                        className={activeTab === tab.value ? "bg-muted" : ""}
                                    >
                                        {tab.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            {tabItems.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                <div className="mt-6">
                    {renderTabContent()}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default memo(ArchitecturePage);
