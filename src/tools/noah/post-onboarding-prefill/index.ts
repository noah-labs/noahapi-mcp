import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostOnboardingPrefillSchema, postOnboardingPrefillSchema } from "./schema";

/**
 * Prefill Customer Details
 */
export const postOnboardingPrefill = async (args: PostOnboardingPrefillSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/onboarding/{CustomerID}/prefill', args);
  
  return JSON.stringify(result, null, 2);
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
