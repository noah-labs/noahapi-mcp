import type { ToolRegistration } from "@/types/tools";
import { type GetInternalCustomersOnboardingSchema, getInternalCustomersOnboardingSchema } from "./schema";

/**
 * Customer Onboarding details
 */
export const getInternalCustomersOnboarding = async (args: GetInternalCustomersOnboardingSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /internal/customers/onboarding
  
  console.log('Noah API call:', { method: 'GET', path: '/internal/customers/onboarding', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /internal/customers/onboarding",
    args
  });
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
