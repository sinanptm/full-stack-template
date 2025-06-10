"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { folderData } from "../data";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


const BackendFolder = () => {
    const [selectedFolder, setSelectedFolder] = useState<string>("src");

    const handleFolderClick = (folderKey: string) => {
        setSelectedFolder(folderKey);
    };

    const getLayerColor = (layer: string) => {
        switch (layer) {
            case "Domain":
                return "bg-blue-900 text-blue-200";
            case "Application":
                return "bg-green-900 text-green-200";
            case "Infrastructure":
                return "bg-orange-900 text-orange-200";
            case "Presentation":
                return "bg-purple-900 text-purple-200";
            case "Shared":
                return "bg-gray-900 text-gray-200";
            default:
                return "bg-slate-900 text-slate-200";
        }
    };
    const customStyle = {
        ...vscDarkPlus,
        'pre[class*="language-"]': {
            ...vscDarkPlus['pre[class*="language-"]'],
            background: "#1e1e1e",
            margin: 0,
            padding: "12px",
            fontSize: "11px",
            lineHeight: "1.4",
            fontFamily:
                "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
        },
        'code[class*="language-"]': {
            ...vscDarkPlus['code[class*="language-"]'],
            background: "#1e1e1e",
            fontSize: "11px",
            lineHeight: "1.4",
            fontFamily:
                "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
        },
    };

    const selectedData = folderData[selectedFolder];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Folder Structure */}
            <Card className="h-fit">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">📁 Backend Structure</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-semibold text-sm overflow-x-auto">
                        <div className="space-y-0.5">
                            <div
                                className={`ml-2 text-blue-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "src" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("src")}
                            >
                                📁 src/
                            </div>
                            <div
                                className={`ml-3 text-green-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "config" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("config")}
                            >
                                📁 config/
                            </div>
                            <div
                                className={`ml-3 text-purple-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "di" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("di")}
                            >
                                📁 di/
                            </div>
                            <div
                                className={`ml-3 text-blue-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "domain" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("domain")}
                            >
                                📁 domain/
                            </div>
                            <div
                                className={`ml-6 text-yellow-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "entities" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("entities")}
                            >
                                📁 entities/
                            </div>
                            <div
                                className={`ml-6 text-yellow-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "interfaces" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("interfaces")}
                            >
                                📁 interfaces/
                            </div>
                            <div
                                className={`ml-8 text-cyan-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "domain/repositories" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("domain/repositories")}
                            >
                                📁 repositories/
                            </div>
                            <div
                                className={`ml-8 text-cyan-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "domain/services" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("domain/services")}
                            >
                                📁 services/
                            </div>
                            <div
                                className={`ml-3 text-orange-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "infrastructure" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("infrastructure")}
                            >
                                📁 infrastructure/
                            </div>
                            <div
                                className={`ml-6 text-pink-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "models" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("models")}
                            >
                                📁 models/
                            </div>
                            <div
                                className={`ml-6 text-pink-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "infrastructure/repositories" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("infrastructure/repositories")}
                            >
                                📁 repositories/
                            </div>
                            <div
                                className={`ml-6 text-pink-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "infrastructure/services" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("infrastructure/services")}
                            >
                                📁 services/
                            </div>
                            <div
                                className={`ml-3 text-red-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "presentation" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("presentation")}
                            >
                                📁 presentation/
                            </div>
                            <div
                                className={`ml-6 text-indigo-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "controllers" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("controllers")}
                            >
                                📁 controllers/
                            </div>
                            <div
                                className={`ml-6 text-indigo-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "middlewares" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("middlewares")}
                            >
                                📁 middlewares/
                            </div>
                            <div
                                className={`ml-6 text-indigo-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "routes" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("routes")}
                            >
                                📁 routes/
                            </div>
                            <div
                                className={`ml-3 text-slate-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "types" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("types")}
                            >
                                📁 types/
                            </div>
                            <div
                                className={`ml-3 text-green-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "use_case" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("use_case")}
                            >
                                📁 use_case/
                            </div>
                            <div
                                className={`ml-6 text-violet-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "use_case/admin" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("use_case/admin")}
                            >
                                📁 admin/
                            </div>
                            <div
                                className={`ml-6 text-violet-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "use_case/user" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("use_case/user")}
                            >
                                📁 user/
                            </div>
                            <div
                                className={`ml-8 text-rose-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "auth" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("auth")}
                            >
                                📁 auth/
                            </div>
                            <div
                                className={`ml-3 text-amber-400 cursor-pointer hover:bg-gray-800 px-1.5 py-0.5 rounded ${selectedFolder === "utils" ? "bg-gray-700" : ""}`}
                                onClick={() => handleFolderClick("utils")}
                            >
                                📁 utils/
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Folder Details */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">📋 Folder Details</CardTitle>
                        <Badge className={getLayerColor(selectedData?.layer || "")} variant="secondary">
                            {selectedData?.layer || "Unknown"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-3 space-y-3">
                    {selectedData && (
                        <>
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-1">📁 {selectedData.name}/</h3>
                                <p className="font-medium text-muted-foreground">{selectedData.purpose}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-1">Description</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{selectedData.description}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-1">File Types</h4>
                                <div className="flex flex-wrap gap-1">
                                    {selectedData.fileTypes.map((type, index) => (
                                        <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-1">Example Files</h4>
                                <div className="bg-muted p-2 rounded-lg">
                                    <div className="space-y-0.5 font-mono text-xs">
                                        {selectedData.examples.map((example, index) => (
                                            <div key={index} className="text-muted-foreground">
                                                {example.endsWith("/") ? "📁" : "📄"} {example}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {selectedData.keyFeatures && (
                                <div>
                                    <h4 className=" font-semibold mb-1">Key Features</h4>
                                    <div className="space-y-0.5">
                                        {selectedData.keyFeatures.map((feature, index) => (
                                            <div key={index} className="text-xs text-muted-foreground flex items-start">
                                                <span className="text-green-500 mr-1">•</span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedData.dependencies && (
                                <div>
                                    <h4 className="font-semibold mb-1">Dependencies</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedData.dependencies.map((dep, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                                                {dep}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Code Example Section */}
                            {selectedData.codeExample && (
                                <div>
                                    <h4 className="text-sm font-semibold mb-1">Code Example</h4>
                                    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700">
                                        {/* VS Code-like header */}
                                        <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d30] border-b border-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                </div>
                                                <span className="text-xs text-gray-300 font-mono ml-2">
                                                    📄 {selectedData.codeExample.filename}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-400">TypeScript</div>
                                        </div>

                                        {/* Code content with syntax highlighting */}
                                        <div className="overflow-x-auto">
                                            <SyntaxHighlighter
                                                language="typescript"
                                                style={customStyle}
                                                customStyle={{
                                                    margin: 0,
                                                    background: "#1e1e1e",
                                                    fontSize: "11px",
                                                    lineHeight: "1.4",
                                                }}
                                                showLineNumbers={true}
                                                lineNumberStyle={{
                                                    color: "#858585",
                                                    fontSize: "10px",
                                                    paddingRight: "12px",
                                                    minWidth: "2em",
                                                }}
                                                wrapLines={true}
                                                wrapLongLines={true}
                                            >
                                                {selectedData.codeExample.code}
                                            </SyntaxHighlighter>
                                        </div>

                                        {/* Description */}
                                        <div className="px-3 pb-3 pt-2 border-t border-gray-700 bg-[#252526]">
                                            <p className="text-xs text-gray-400 leading-relaxed">{selectedData.codeExample.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default BackendFolder;
