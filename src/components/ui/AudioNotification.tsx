import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X } from 'lucide-react';

interface AudioNotificationProps {
  show: boolean;
  onDismiss: () => void;
  onEnable: () => void;
}

export const AudioNotification = ({ show, onDismiss, onEnable }: AudioNotificationProps) => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (show) {
      setDismissed(false);
    }
  }, [show]);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  const handleEnable = () => {
    onEnable();
    setDismissed(true);
    onDismiss();
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm"
        >
          <div className="p-4 rounded-xl bg-black/80 backdrop-blur-sm border border-cyan-500/30 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">Winter Music Available</h4>
                <p className="text-xs text-gray-300 mb-3">
                  Enhance your experience with ambient winter sounds
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleEnable}
                    className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg text-xs font-medium transition-colors"
                  >
                    Enable Music
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-1 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg text-xs font-medium transition-colors"
                  >
                    No Thanks
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};