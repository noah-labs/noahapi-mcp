export interface NoahApiConfig {
  apiKey: string;
  apiUrl: string;
}

export class NoahApiClient {
  private config: NoahApiConfig;

  constructor(config: NoahApiConfig) {
    this.config = config;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Api-Signature': this.config.apiKey,
    };
  }

  async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any,
    queryParams?: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(path, this.config.apiUrl);
    
    // Add query parameters
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Noah API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async get<T = any>(path: string, queryParams?: Record<string, string | number>): Promise<T> {
    return this.request<T>('GET', path, undefined, queryParams);
  }

  async post<T = any>(path: string, body?: any): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  async put<T = any>(path: string, body?: any): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  async delete<T = any>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

// Create a singleton instance
let noahApiClient: NoahApiClient | null = null;

export function getNoahApiClient(): NoahApiClient {
  if (!noahApiClient) {
    const apiKey = process.env.NOAH_API_KEY;
    const apiUrl = process.env.NOAH_API_URL || 'https://api.noah.com';

    if (!apiKey) {
      throw new Error('NOAH_API_KEY environment variable is required');
    }

    noahApiClient = new NoahApiClient({
      apiKey,
      apiUrl,
    });
  }

  return noahApiClient;
} 