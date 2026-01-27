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

  // Usage Limits - ALL REMOVED (unlimited for everyone)
  limits: {
    freeDaily: 999999, // Unlimited readings
    premiumDaily: 999999, // Unlimited readings
  },

  // App Info
  app: {
    version: '1.0.0',
    bundleId: {
      ios: 'com.qlj.CelestialEye',
      android: 'com.qlj.CelestialEye',
    },
  },

  // Feature Flags - ALL FEATURES ENABLED
  features: {
    enableHistory: true,
    enableSharing: false, // User requested no sharing
    enableNotifications: true, // Enabled
    enablePremium: true, // All premium features enabled for everyone
  },
} as const;

export type Config = typeof config;
