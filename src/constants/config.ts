/**
 * App Configuration
 * Central config for API URLs, limits, and other constants
 */

export const config = {
  // Dify API Configuration
  dify: {
    apiUrl: process.env.EXPO_PUBLIC_DIFY_API_URL || '',
    apiKey: process.env.EXPO_PUBLIC_DIFY_API_KEY || '',
    timeout: 30000, // 30 seconds
  },

  // Usage Limits
  limits: {
    freeDaily: 3, // Free readings per day
    premiumDaily: 999, // Effectively unlimited for premium
  },

  // App Info
  app: {
    version: '1.0.0',
    bundleId: {
      ios: 'com.qlj.tarotai',
      android: 'com.qlj.tarotai',
    },
  },

  // Feature Flags
  features: {
    enableHistory: true,
    enableSharing: false, // User requested no sharing
    enableNotifications: false, // Future feature
    enablePremium: false, // Future feature
  },
} as const;

export type Config = typeof config;
