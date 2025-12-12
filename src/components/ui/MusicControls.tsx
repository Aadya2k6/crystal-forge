import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicControlsProps {
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

export const MusicControls = ({ 
  isPlaying, 
  volume, 
  onToggle, 
  onVolumeChange, 
  className = '' 
}: MusicControlsProps) => {
  return (
    <motion.div 
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 ${className}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Play/Pause Button */}
      <motion.button
        onClick={onToggle}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </motion.button>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => onVolumeChange(volume > 0 ? 0 : 0.3)}
          className="p-1 text-white/70 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={volume > 0 ? 'Mute' : 'Unmute'}
        >
          {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>

        <div className="relative w-16">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer volume-slider"
            title="Volume"
            style={{
              background: `linear-gradient(to right, #67e8f9 0%, #67e8f9 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              .volume-slider::-webkit-slider-thumb {
                appearance: none;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #67e8f9;
                cursor: pointer;
                box-shadow: 0 0 10px rgba(103, 232, 249, 0.5);
              }
              .volume-slider::-moz-range-thumb {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #67e8f9;
                cursor: pointer;
                border: none;
                box-shadow: 0 0 10px rgba(103, 232, 249, 0.5);
              }
            `
          }} />
        </div>
      </div>

      {/* Music indicator */}
      <div className="flex items-center gap-1">
        <div className="text-xs text-white/60">♪</div>
        {isPlaying && (
          <motion.div 
            className="flex gap-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-0.5 h-3 bg-cyan-400 rounded-full"></div>
            <div className="w-0.5 h-2 bg-cyan-400 rounded-full"></div>
            <div className="w-0.5 h-4 bg-cyan-400 rounded-full"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};