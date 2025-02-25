import { ZERO } from '../../const.js';

export function generateRandomValue (min: number, max: number, numAfterDigit = ZERO) {
  return + ((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T> (items: T[]): T[] {
  const startPosition = generateRandomValue(ZERO, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T> (items: T[]): T {
  return items[generateRandomValue(ZERO, items.length - 1)];
}

export function getErrorMessage (error: unknown): string {
  return error instanceof Error ? error.message : '';
}
