import { memo, useRef, useState } from "react";
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

interface CustomFileInputProps
  extends BaseFormFieldProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  maxSize?: number;
  allowedTypes?: string[];
  showPreview?: boolean;
}

const CustomFileInput = ({
  showPreview = true,
  onChange,
  maxSize,
  allowedTypes,
  ...props
}: CustomFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // eslint-disable-next-line
  const { error, className, showHint, maxLength, ...inputProps } = props;

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
      fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
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
    <FormFieldWrapper {...props} error={error}>
      {(id, describedBy) => (
        <>
          <div
            className={cn(
              "relative border-2 border-dashed border-input rounded-md p-6 transition-colors",
              dragOver && "border-primary bg-primary/5",
              error && "border-destructive",
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
              aria-invalid={!!error}
              aria-describedby={describedBy}
              onChange={handleFileChange}
              {...inputProps} // safe props only
            />
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
              </p>
              {allowedTypes && (
                <p className="text-xs text-muted-foreground mt-1">{allowedTypes.join(", ")}</p>
              )}
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
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </FormFieldWrapper>
  );
};

export default memo(CustomFileInput);
