/**
 * Major Arcana SVG Cards Index
 * 22张大阿卡纳卡牌导出
 */

import type { FC } from 'react';
import type { CardSVGProps } from '../types';

import { TheFool } from './TheFool';
import { TheMagician } from './TheMagician';
import { TheHighPriestess } from './TheHighPriestess';
import { TheEmpress } from './TheEmpress';
import { TheEmperor } from './TheEmperor';
import { TheHierophant } from './TheHierophant';
import { TheLovers } from './TheLovers';
import { TheChariot } from './TheChariot';
import { Strength } from './Strength';
import { TheHermit } from './TheHermit';
import { WheelOfFortune } from './WheelOfFortune';
import { Justice } from './Justice';
import { TheHangedMan } from './TheHangedMan';
import { Death } from './Death';
import { Temperance } from './Temperance';
import { TheDevil } from './TheDevil';
import { TheTower } from './TheTower';
import { TheStar } from './TheStar';
import { TheMoon } from './TheMoon';
import { TheSun } from './TheSun';
import { Judgement } from './Judgement';
import { TheWorld } from './TheWorld';

// Named exports
export {
  TheFool,
  TheMagician,
  TheHighPriestess,
  TheEmpress,
  TheEmperor,
  TheHierophant,
  TheLovers,
  TheChariot,
  Strength,
  TheHermit,
  WheelOfFortune,
  Justice,
  TheHangedMan,
  Death,
  Temperance,
  TheDevil,
  TheTower,
  TheStar,
  TheMoon,
  TheSun,
  Judgement,
  TheWorld,
};

// Map of card ID to component
export const MAJOR_ARCANA_COMPONENTS: Record<number, FC<CardSVGProps>> = {
  0: TheFool,
  1: TheMagician,
  2: TheHighPriestess,
  3: TheEmpress,
  4: TheEmperor,
  5: TheHierophant,
  6: TheLovers,
  7: TheChariot,
  8: Strength,
  9: TheHermit,
  10: WheelOfFortune,
  11: Justice,
  12: TheHangedMan,
  13: Death,
  14: Temperance,
  15: TheDevil,
  16: TheTower,
  17: TheStar,
  18: TheMoon,
  19: TheSun,
  20: Judgement,
  21: TheWorld,
};

// Get Major Arcana component by ID
export const getMajorArcanaComponent = (id: number): FC<CardSVGProps> | undefined => {
  return MAJOR_ARCANA_COMPONENTS[id];
};
