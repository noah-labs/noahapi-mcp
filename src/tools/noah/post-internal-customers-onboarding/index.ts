import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalCustomersOnboardingSchema, postInternalCustomersOnboardingSchema } from "./schema";

/**
 * Post Customer Onboarding
 */
export const postInternalCustomersOnboarding = async (args: PostInternalCustomersOnboardingSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/customers/onboarding', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalCustomersOnboardingTool: ToolRegistration<PostInternalCustomersOnboardingSchema> = {
  name: "post_internal_customers_onboarding",
  description: "Updates customer onboarding details",
  inputSchema: postInternalCustomersOnboardingSchema,
  handler: async (args: PostInternalCustomersOnboardingSchema) => {
    try {
      const parsedArgs = postInternalCustomersOnboardingSchema.parse(args);
      const result = await postInternalCustomersOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalCustomersOnboardingTool handler:", error);
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
