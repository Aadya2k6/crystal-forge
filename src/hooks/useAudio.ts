import { useEffect, useRef, useState } from 'react';

interface UseAudioOptions {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
  fadeIn?: boolean;
  fadeInDuration?: number;
  startTime?: number; // Start time in seconds
}

export const useAudio = (src: string, options: UseAudioOptions = {}) => {
  const {
    autoPlay = false,
    loop = true,
    volume = 0.3,
    fadeIn = true,
    fadeInDuration = 2000,
    startTime = 0
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [hasError, setHasError] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(src);
    const audio = audioRef.current;
    
    // Set initial properties
    audio.loop = loop;
    audio.volume = fadeIn ? 0 : volume;
    
    // Event listeners
    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoPlay) {
        play();
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setHasError(true);
      console.log(`Audio file not found: ${src}. Music controls will be hidden.`);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [src, autoPlay, loop, volume, fadeIn]);

  const play = async () => {
    if (!audioRef.current || !isLoaded || hasError) return;
    
    try {
      // Set start time if specified
      if (startTime > 0) {
        audioRef.current.currentTime = startTime;
      }
      
      await audioRef.current.play();
      
      // Fade in effect
      if (fadeIn) {
        audioRef.current.volume = 0;
        const targetVolume = volume;
        const steps = 50;
        const stepSize = targetVolume / steps;
        const stepDelay = fadeInDuration / steps;
        let currentStep = 0;
        
        fadeIntervalRef.current = setInterval(() => {
          if (currentStep >= steps || !audioRef.current) {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
            return;
          }
          
          const newVolume = stepSize * currentStep;
          audioRef.current.volume = Math.min(newVolume, targetVolume);
          setCurrentVolume(audioRef.current.volume);
          currentStep++;
        }, stepDelay);
      }
    } catch (error) {
      console.log('Audio play failed (user interaction required):', error);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    
    // Clear fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    
    audioRef.current.pause();
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setCurrentVolume(clampedVolume);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    play,
    pause,
    toggle,
    setVolume,
    isPlaying,
    isLoaded,
    hasError,
    currentVolume,
    audioElement: audioRef.current
  };
};