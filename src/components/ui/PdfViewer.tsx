import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';

interface PdfViewerProps {
  pdfData: {
    fileName: string;
    fileSize: number;
    base64Data: string;
    uploadedAt: number;
  };
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
}

export const PdfViewer = ({ pdfData, isOpen, onClose, teamName }: PdfViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfData.base64Data;
    link.download = `${teamName}_${pdfData.fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/20 rounded-2xl z-50 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Enhanced Header with Better Back Button */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 relative">
              {/* Prominent Back Button */}
              <motion.button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-white border border-cyan-400/30 transition-all duration-200 shadow-lg hover:shadow-cyan-400/20"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Back to Team Details"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </motion.button>
              
              <div className="flex items-center gap-3 flex-1 justify-center">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div className="text-center">
                  <h3 className="text-white font-semibold">Student ID Card</h3>
                  <p className="text-white/60 text-sm">
                    {teamName} • {pdfData.fileName} • {formatFileSize(pdfData.fileSize)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleDownload}
                  className="p-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors border border-green-400/30 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={onClose}
                  className="p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors border border-red-400/30 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
              {/* Warning Banner */}
              <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <p className="text-amber-200 text-sm">
                  This document will be automatically deleted after your verification decision for privacy protection.
                </p>
              </div>

              {/* Floating Back Button - Always Visible */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border border-white/20 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                title="Back to Team Details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium text-sm">Back</span>
              </motion.button>

              {/* PDF Embed */}
              <div className="absolute inset-0 top-12">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      Loading PDF...
                    </div>
                  </div>
                )}
                
                <embed
                  src={pdfData.base64Data}
                  type="application/pdf"
                  className="w-full h-full"
                  onLoad={() => setIsLoading(false)}
                />
                
                {/* Fallback message if PDF doesn't load */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-slate-800/90 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-white/70 text-sm mb-2">
                      If the PDF doesn't display properly, you can:
                    </p>
                    <button
                      onClick={handleDownload}
                      className="text-cyan-400 hover:text-cyan-300 underline text-sm"
                    >
                      Download and open in your PDF viewer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};