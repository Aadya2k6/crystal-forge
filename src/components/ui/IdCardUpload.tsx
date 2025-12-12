import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react';

interface IdCardUploadProps {
  value: {
    fileName: string;
    fileSize: number;
    base64Data: string;
    uploadedAt: number;
  } | null;
  onChange: (file: File | null) => Promise<void>;
  error?: string | null;
}

export const IdCardUpload = ({ value, onChange, error }: IdCardUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
      await onChange(file);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      handleFileSelect(pdfFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Header matching project description styling */}
      <div className="space-y-2">
        <label className="block mb-2 font-inter text-sm font-medium text-foreground/70">
          Student ID Card (PDF) *
        </label>
        
        <div className="text-xs text-foreground/50 leading-relaxed">
          Upload your student ID card for verification. This will only be used for verification purposes and will be removed after admin approval/rejection.
        </div>
      </div>

      {!value ? (
        <motion.div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            isDragging
              ? 'border-ice-cyan bg-glass-bg/20 shadow-glow-soft'
              : 'border-glass-border/50 hover:border-glass-border bg-glass-bg/10'
          }`}
          style={{
            background: isDragging 
              ? 'hsl(var(--glass-bg) / 0.2)' 
              : 'hsl(var(--glass-bg) / 0.1)',
            borderColor: isDragging 
              ? 'hsl(var(--ice-cyan))' 
              : 'hsl(var(--glass-border) / 0.5)'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          <div className="space-y-4">
            <motion.div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: isUploading 
                  ? 'hsl(var(--holo-purple) / 0.2)' 
                  : 'hsl(var(--ice-cyan) / 0.2)',
                border: isUploading 
                  ? '2px solid hsl(var(--holo-purple) / 0.5)' 
                  : '2px solid hsl(var(--ice-cyan) / 0.5)'
              }}
              animate={isUploading ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isUploading ? Infinity : 0 }}
            >
              <Upload 
                className="w-8 h-8" 
                style={{ 
                  color: isUploading 
                    ? 'hsl(var(--holo-purple))' 
                    : 'hsl(var(--ice-cyan))' 
                }} 
              />
            </motion.div>
            
            <div className="space-y-2">
              <p className="font-inter text-base font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                {isUploading ? 'Uploading...' : 'Drop your PDF here or click to browse'}
              </p>
              <p className="font-inter text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {isUploading 
                  ? 'Please wait while we process your file' 
                  : 'Maximum file size: 5MB'
                }
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="rounded-xl p-4"
          style={{
            background: 'hsl(var(--glass-bg) / 0.9)',
            border: '2px solid hsl(var(--glass-border) / 0.5)',
            boxShadow: 'inset 0 2px 4px hsl(185 100% 50% / 0.05)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg flex items-center justify-center"
                style={{
                  background: 'hsl(var(--ice-cyan) / 0.2)',
                  border: '1px solid hsl(var(--ice-cyan) / 0.5)'
                }}
              >
                <FileText className="w-5 h-5" style={{ color: 'hsl(var(--ice-cyan))' }} />
              </div>
              <div>
                <p className="font-inter text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                  {value.fileName}
                </p>
                <p className="font-inter text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {formatFileSize(value.fileSize)} • Uploaded {new Date(value.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" style={{ color: 'hsl(var(--ice-cyan))' }} />
              <button
                onClick={handleRemove}
                className="p-1 rounded-lg transition-colors"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'hsl(var(--glass-border) / 0.2)';
                  e.currentTarget.style.color = 'hsl(var(--foreground))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                }}
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="flex items-center gap-2 text-sm"
          style={{ color: 'hsl(var(--destructive))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  );
};