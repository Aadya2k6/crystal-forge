import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RecaptchaProps {
  onVerify: (token: string | null) => void;
  siteKey: string;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

// Add CSS to hide reCAPTCHA badge completely
const hideBadgeStyle = `
  .grecaptcha-badge { 
    visibility: hidden !important;
    opacity: 0 !important;
    display: none !important;
  }
  iframe[src*="recaptcha"] {
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    left: -9999px !important;
  }
  .grecaptcha-logo {
    visibility: hidden !important;
    opacity: 0 !important;
    display: none !important;
  }
`;

export const Recaptcha = ({ onVerify, siteKey }: RecaptchaProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        
        {!isVerified ? (
          /* Custom checkbox verification interface */
          <div className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-glacier-deep/30 to-ice-cyan/20 backdrop-blur-md border border-glacier-deep/40 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (!isChecked && !isVerified) {
                    setIsChecked(true);
                    // Immediately complete verification after short delay
                    setTimeout(() => {
                      setIsVerified(true);
                      onVerify('verified-token-' + Date.now());
                    }, 300);
                  }
                }}
              >
                <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                  isChecked 
                    ? 'bg-ice-cyan border-ice-cyan' 
                    : 'border-glacier-deep/60 bg-white/10'
                }`}>
                  {isChecked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white m-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
              </motion.div>
              <span className="text-glacier-deep font-medium">❄️ I'm not a robot</span>
            </div>
          </div>
        ) : (
          /* Verification complete message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-green-400/20 backdrop-blur-md border border-emerald-400/40 rounded-xl shadow-lg"
          >
            <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-emerald-600 font-semibold">✅ Verification Complete!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Demo component for development (when no real reCAPTCHA key is available)
export const DemoRecaptcha = ({ onVerify }: { onVerify: (token: string | null) => void }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleDemoVerification = () => {
    if (!isChecked && !isVerified) {
      setIsChecked(true);
      // Immediately complete verification
      setTimeout(() => {
        setIsVerified(true);
        onVerify('verified-token-' + Date.now());
      }, 300);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {!isVerified ? (
          /* Custom checkbox verification interface */
          <div className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-glacier-deep/30 to-ice-cyan/20 backdrop-blur-md border border-glacier-deep/40 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDemoVerification}
              >
                <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                  isChecked 
                    ? 'bg-ice-cyan border-ice-cyan' 
                    : 'border-glacier-deep/60 bg-white/10'
                }`}>
                  {isChecked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white m-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </div>
              </motion.div>
              <span className="text-glacier-deep font-medium">❄️ I'm not a robot</span>
            </div>
          </div>
        ) : (
          /* Verification complete message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-green-400/20 backdrop-blur-md border border-emerald-400/40 rounded-xl shadow-lg"
          >
            <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-emerald-600 font-semibold">✅ Verification Complete!</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};