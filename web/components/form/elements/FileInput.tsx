"use client";

import type React from "react";

import { Label } from "@radix-ui/react-label";
import { memo, useId, useRef, useState } from "react";
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
    maxSize?: number; // in MB
    allowedTypes?: string[];
    showPreview?: boolean;
}

const FileInput = ({
    label,
    error,
    hint,
    required,
    className,
    showHind,
    maxSize,
    allowedTypes,
    showPreview = true,
    onChange,
    ...props
}: FileInputProps) => {
    const id = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const hasError = !!error;
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
        onChange?.(event);
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setDragOver(false);

        const files = Array.from(event.dataTransfer.files);
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            fileInputRef.current.files = dataTransfer.files;

            const changeEvent = new Event("change", { bubbles: true });
            fileInputRef.current.dispatchEvent(changeEvent);
        }
        setSelectedFiles(files);
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);

        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            newFiles.forEach((file) => dataTransfer.items.add(file));
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
            {label && (
                <Label
                    htmlFor={id}
                    className={cn(
                        "text-sm font-medium leading-none",
                        hasError && "text-destructive",
                        required && "after:content-['*'] after:ml-0.5 after:text-destructive",
                    )}
                >
                    {label}
                </Label>
            )}

            <div
                className={cn(
                    "relative border-2 border-dashed border-input rounded-md p-6 transition-colors",
                    dragOver && "border-primary bg-primary/5",
                    hasError && "border-destructive",
                    className,
                )}
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
            >
                <input
                    ref={fileInputRef}
                    id={id}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-invalid={hasError}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                    onChange={handleFileChange}
                    {...props}
                />

                <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                    </p>
                    {allowedTypes && <p className="text-xs text-muted-foreground mt-1">{allowedTypes.join(", ")}</p>}
                    {maxSize && <p className="text-xs text-muted-foreground">Max size: {maxSize}MB</p>}
                </div>
            </div>

            {showPreview && selectedFiles.length > 0 && (
                <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <div className="flex items-center space-x-2">
                                <File className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p id={`${id}-error`} className="text-xs text-destructive" role="alert" aria-live="polite">
                    {error}
                </p>
            )}

            {hint && showHind && !error && (
                <p id={`${id}-hint`} className="text-xs text-muted-foreground">
                    {hint}
                </p>
            )}
        </div>
    );
};

export default memo(FileInput);
