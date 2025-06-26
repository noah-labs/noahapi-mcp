import { getNoahConfig, validateConfig } from "./config";

interface NoahClientConfig {
  baseUrl?: string;
  apiKey?: string;
  environment?: "sandbox" | "production";
}

interface NoahApiResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

class NoahBusinessApiClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor() {
    const defaultConfig = getNoahConfig();

    this.baseUrl = defaultConfig.baseUrl || "https://api.sandbox.noah.com/v1";
    this.apiKey = defaultConfig.apiKey || "";

    this.headers = {
      "Content-Type": "application/json",
      "User-Agent": "noah-business-api-mcp/0.1.11",
      "X-Api-Key": this.apiKey,
    };

    // Validate configuration
    const validation = validateConfig({
      apiKey: this.apiKey,
      baseUrl: this.baseUrl,
      environment: defaultConfig.environment,
    });

    if (!validation.valid) {
      console.warn(
        "Noah API configuration issues:",
        validation.errors.join(", "),
      );
    }
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>,
  ): Promise<NoahApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.headers, ...customHeaders };

      const config: RequestInit = {
        method,
        headers,
      };

      if (
        data &&
        (method === "POST" || method === "PUT" || method === "PATCH")
      ) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }

      if (!response.ok) {
        return {
          error: {
            message: `HTTP ${response.status}: ${response.statusText}`,
            code: response.status.toString(),
            details: responseData,
          },
        };
      }

      return { data: responseData };
    } catch (error) {
      return {
        error: {
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
          details: error,
        },
      };
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<NoahApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }
    return this.makeRequest<T>("GET", url);
  }

  async post<T>(endpoint: string, data?: any): Promise<NoahApiResponse<T>> {
    return this.makeRequest<T>("POST", endpoint, data);
  }

  async put<T>(endpoint: string, data?: any): Promise<NoahApiResponse<T>> {
    return this.makeRequest<T>("PUT", endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<NoahApiResponse<T>> {
    return this.makeRequest<T>("DELETE", endpoint);
  }

  // Helper method to replace path parameters
  replacePath(path: string, params: Record<string, any>): string {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, encodeURIComponent(value.toString()));
    });
    return result;
  }
}

// Export singleton instance
export const noahClient = new NoahBusinessApiClient();
export { NoahBusinessApiClient, type NoahClientConfig, type NoahApiResponse };
