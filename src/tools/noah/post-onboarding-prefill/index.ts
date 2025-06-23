import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingPrefillSchema, postOnboardingPrefillSchema } from "./schema";

/**
 * Prefill Customer Details
 */
export const postOnboardingPrefill = async (args: PostOnboardingPrefillSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /onboarding/{CustomerID}/prefill
  
  console.log('Noah API call:', { method: 'POST', path: '/onboarding/{CustomerID}/prefill', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /onboarding/{CustomerID}/prefill",
    args
  });
};

export const postOnboardingPrefillTool: ToolRegistration<PostOnboardingPrefillSchema> = {
  name: "post_onboarding_prefill",
  description: "Share customer details for onboarding session",
  inputSchema: postOnboardingPrefillSchema,
  handler: async (args: PostOnboardingPrefillSchema) => {
    try {
      const parsedArgs = postOnboardingPrefillSchema.parse(args);
      const result = await postOnboardingPrefill(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postOnboardingPrefillTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};
