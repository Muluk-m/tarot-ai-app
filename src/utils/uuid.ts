/**
 * UUID Generator using expo-crypto
 * Compatible with React Native environment
 */

import { getRandomValues } from 'expo-crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a UUID v4 using expo-crypto for random values
 * @returns A UUID v4 string
 */
export const v4 = () => {
  const random = new Uint8Array(16);
  getRandomValues(random);

  return uuidv4({
    random,
  });
};

export default { v4 };
