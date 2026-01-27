/**
 * Typewriter Effect Hook
 * Animates text character by character for mystical reveal effect
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface TypewriterOptions {
  /** Speed in milliseconds per character (default: 30) */
  speed?: number;
  /** Delay before starting in milliseconds (default: 0) */
  delay?: number;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Callback on each character typed */
  onTick?: (currentText: string) => void;
}

export interface TypewriterResult {
  /** Currently displayed text */
  displayedText: string;
  /** Whether typing is in progress */
  isTyping: boolean;
  /** Whether typing is complete */
  isComplete: boolean;
  /** Start typing animation */
  start: () => void;
  /** Stop typing animation */
  stop: () => void;
  /** Reset to beginning */
  reset: () => void;
  /** Skip to end immediately */
  skipToEnd: () => void;
  /** Update the full text (useful for streaming) */
  updateFullText: (text: string) => void;
}

/**
 * Custom hook for typewriter text animation
 * @param fullText - The complete text to animate
 * @param options - Configuration options
 */
export function useTypewriter(
  fullText: string,
  options: TypewriterOptions = {}
): TypewriterResult {
  const {
    speed = 30,
    delay = 0,
    onComplete,
    onTick,
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const fullTextRef = useRef(fullText);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update fullText ref when it changes
  useEffect(() => {
    fullTextRef.current = fullText;
  }, [fullText]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    };
  }, []);

  const typeNextCharacter = useCallback(() => {
    const currentIndex = currentIndexRef.current;
    const text = fullTextRef.current;

    if (currentIndex < text.length) {
      const nextText = text.slice(0, currentIndex + 1);
      setDisplayedText(nextText);
      onTick?.(nextText);
      currentIndexRef.current += 1;
    } else {
      // Typing complete
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTyping(false);
      setIsComplete(true);
      onComplete?.();
    }
  }, [onComplete, onTick]);

  const start = useCallback(() => {
    if (isTyping) return;

    setIsTyping(true);
    setIsComplete(false);

    // Apply initial delay
    if (delay > 0) {
      startTimeoutRef.current = setTimeout(() => {
        timerRef.current = setInterval(typeNextCharacter, speed);
      }, delay);
    } else {
      timerRef.current = setInterval(typeNextCharacter, speed);
    }
  }, [isTyping, delay, speed, typeNextCharacter]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
    setIsTyping(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setDisplayedText('');
    setIsComplete(false);
    currentIndexRef.current = 0;
  }, [stop]);

  const skipToEnd = useCallback(() => {
    stop();
    setDisplayedText(fullTextRef.current);
    setIsComplete(true);
    currentIndexRef.current = fullTextRef.current.length;
    onComplete?.();
  }, [stop, onComplete]);

  const updateFullText = useCallback((text: string) => {
    fullTextRef.current = text;

    // If we're currently typing and the new text is longer,
    // continue typing from current position
    if (isTyping && text.length > displayedText.length) {
      // Keep typing
      return;
    }

    // If the text changed dramatically, restart
    if (!text.startsWith(displayedText)) {
      reset();
      fullTextRef.current = text;
    }
  }, [isTyping, displayedText, reset]);

  return {
    displayedText,
    isTyping,
    isComplete,
    start,
    stop,
    reset,
    skipToEnd,
    updateFullText,
  };
}

/**
 * Simplified auto-start typewriter hook
 * Automatically starts typing when text changes
 */
export function useAutoTypewriter(
  text: string,
  options: TypewriterOptions = {}
): Omit<TypewriterResult, 'start' | 'stop'> {
  const typewriter = useTypewriter(text, options);

  useEffect(() => {
    if (text && !typewriter.isTyping && !typewriter.isComplete) {
      typewriter.start();
    }
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    displayedText: typewriter.displayedText,
    isTyping: typewriter.isTyping,
    isComplete: typewriter.isComplete,
    reset: typewriter.reset,
    skipToEnd: typewriter.skipToEnd,
    updateFullText: typewriter.updateFullText,
  };
}
