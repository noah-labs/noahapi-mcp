import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalCustomersOnboardingSchema, getInternalCustomersOnboardingSchema } from "./schema";

/**
 * Customer Onboarding details
 */
export const getInternalCustomersOnboarding = async (args: GetInternalCustomersOnboardingSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/customers/onboarding');
  
  return JSON.stringify(result, null, 2);
};

export const getInternalCustomersOnboardingTool: ToolRegistration<GetInternalCustomersOnboardingSchema> = {
  name: "get_internal_customers_onboarding",
  description: "Retrieves onboarding details of the customer",
  inputSchema: getInternalCustomersOnboardingSchema,
  handler: async (args: GetInternalCustomersOnboardingSchema) => {
    try {
      const parsedArgs = getInternalCustomersOnboardingSchema.parse(args);
      const result = await getInternalCustomersOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalCustomersOnboardingTool handler:", error);
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
