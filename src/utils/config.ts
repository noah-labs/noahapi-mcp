export interface NoahConfig {
  apiKey?: string;
  baseUrl?: string;
  environment: "sandbox" | "production";
}

export function getNoahConfig(): NoahConfig {
  return {
    apiKey: process.env.NOAH_API_KEY,
    baseUrl:
      process.env.NOAH_API_BASE_URL ||
      (process.env.NOAH_ENVIRONMENT === "production" ? "https://api.noah.com/v1" : "https://api.sandbox.noah.com/v1"),
    environment: (process.env.NOAH_ENVIRONMENT as "sandbox" | "production") || "sandbox",
  };
}

export function validateConfig(config: NoahConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.apiKey) {
    errors.push("NOAH_API_KEY environment variable is required");
  }

  if (!config.baseUrl) {
    errors.push("NOAH_API_BASE_URL environment variable is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
