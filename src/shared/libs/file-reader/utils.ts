export function isDate (value: unknown): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}
