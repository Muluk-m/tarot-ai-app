/**
 * Interpretation Display Component
 * Shows AI-generated tarot interpretation with typewriter effect
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useTypewriter } from '@/hooks/useTypewriter';

interface InterpretationDisplayProps {
  /** The full interpretation text */
  text: string;
  /** Whether the API is still streaming */
  isStreaming?: boolean;
  /** Error message if generation failed */
  error?: string | null;
  /** Typewriter speed in ms per character (default: 30) */
  speed?: number;
  /** Allow user to skip to end */
  allowSkip?: boolean;
  /** Custom styling */
  className?: string;
}

export function InterpretationDisplay({
  text,
  isStreaming = false,
  error = null,
  speed = 30,
  allowSkip = true,
  className = '',
}: InterpretationDisplayProps) {
  const [showCursor, setShowCursor] = useState(true);

  const typewriter = useTypewriter(text, {
    speed,
    onComplete: () => {
      setShowCursor(false);
    },
  });

  // Start typing when text becomes available
  useEffect(() => {
    if (text && !typewriter.isTyping && !typewriter.isComplete) {
      typewriter.start();
    }
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update typewriter with new streaming chunks
  useEffect(() => {
    if (isStreaming && text) {
      typewriter.updateFullText(text);
    }
  }, [text, isStreaming]); // eslint-disable-line react-hooks/exhaustive-deps

  // Blinking cursor effect
  useEffect(() => {
    if (!typewriter.isTyping || !showCursor) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [typewriter.isTyping, showCursor]);

  // Handle skip to end
  const handleSkip = () => {
    if (allowSkip && typewriter.isTyping) {
      typewriter.skipToEnd();
    }
  };

  // Show error state
  if (error) {
    return (
      <View className={`rounded-2xl bg-bg-secondary p-6 ${className}`}>
        <Text className="text-center text-base text-red-400">
          ✨ Unable to divine your reading
        </Text>
        <Text className="mt-2 text-center text-sm text-text-secondary">
          {error}
        </Text>
      </View>
    );
  }

  // Show loading state (before streaming starts)
  if (!text && isStreaming) {
    return (
      <View className={`items-center justify-center rounded-2xl bg-bg-secondary p-8 ${className}`}>
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text className="mt-4 text-center text-base text-accent-gold">
          ✨ Consulting the cards...
        </Text>
      </View>
    );
  }

  // No content yet
  if (!text) {
    return null;
  }

  return (
    <Pressable
      onPress={handleSkip}
      disabled={!allowSkip || !typewriter.isTyping}
      className={`rounded-2xl bg-bg-secondary p-6 ${className}`}
    >
      {/* Interpretation text with typewriter effect */}
      <Text className="text-base leading-7 text-text-primary">
        {typewriter.displayedText}
        {typewriter.isTyping && showCursor && (
          <Text className="text-accent-gold">▊</Text>
        )}
      </Text>

      {/* Skip hint */}
      {allowSkip && typewriter.isTyping && (
        <Text className="mt-4 text-center text-xs text-text-tertiary">
          Tap to skip to end
        </Text>
      )}

      {/* Streaming indicator */}
      {isStreaming && (
        <View className="mt-4 flex-row items-center justify-center">
          <ActivityIndicator size="small" color="#8B5CF6" />
          <Text className="ml-2 text-xs text-accent-purple">
            Receiving divine wisdom...
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default InterpretationDisplay;
