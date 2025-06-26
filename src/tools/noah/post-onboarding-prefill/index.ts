import type { ToolRegistration } from "@/types/tools";
import { type PostOnboardingPrefillSchema, postOnboardingPrefillSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Prefill Customer Details
 */
export const postOnboardingPrefill = async (args: PostOnboardingPrefillSchema): Promise<string> => {
  try {
    const { CustomerID, ...body } = args;
    const endpoint = noahClient.replacePath('/onboarding/{CustomerID}/prefill', { CustomerID });
    const response = await noahClient.post(endpoint, body);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Successfully prefilled onboarding session for customer ${CustomerID}`,
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
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
