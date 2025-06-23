import type { ToolRegistration } from "../types/tools.js";

// Define the schema for prompts
export const promptSchema = {
  name: "string",
  description: "string",
  arguments: "array",
  handler: "function"
};

export type PromptSchema = {
  name: string;
  description?: string;
  arguments?: Array<{
    name: string;
    description?: string;
    required?: boolean;
  }>;
  handler: (args: any) => any;
};

// Create and export prompts
export const createPrompts = (): PromptSchema[] => {
  return [
    // Noah Business API prompts can be added here in the future
  ];
};

export default createPrompts; 