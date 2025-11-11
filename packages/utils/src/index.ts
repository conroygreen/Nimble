export const logger = {
  info: (...args: unknown[]) => console.log('[info]', ...args),
  warn: (...args: unknown[]) => console.warn('[warn]', ...args),
  error: (...args: unknown[]) => console.error('[error]', ...args),
};

export function getEnv(name: string, fallback?: string) {
  const v = process.env[name];
  if (!v && fallback === undefined) throw new Error(`Missing env ${name}`);
  return v ?? fallback ?? '';
}
