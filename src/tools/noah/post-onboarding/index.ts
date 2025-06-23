import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostOnboardingSchema, postOnboardingSchema } from "./schema";

/**
 * Create Onboarding Session
 */
export const postOnboarding = async (args: PostOnboardingSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/onboarding/{CustomerID}', args);
  
  return JSON.stringify(result, null, 2);
};

export const postOnboardingTool: ToolRegistration<PostOnboardingSchema> = {
  name: "post_onboarding",
  description: "Retrieve details for customer onboarding session",
  inputSchema: postOnboardingSchema,
  handler: async (args: PostOnboardingSchema) => {
    try {
      const parsedArgs = postOnboardingSchema.parse(args);
      const result = await postOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postOnboardingTool handler:", error);
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
