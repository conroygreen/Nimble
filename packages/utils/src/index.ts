// Simple logger and config helpers placeholders
export const logger = {
  info: (...args: any[]) => console.log("[info]", ...args),
  warn: (...args: any[]) => console.warn("[warn]", ...args),
  error: (...args: any[]) => console.error("[error]", ...args)
};

export function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// Using dynamic access to avoid type errors until node types resolved globally
export const env = {
  NODE_ENV: (globalThis as any).process?.env?.NODE_ENV || "development",
};
