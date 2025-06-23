import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PutInternalCustomersOnboardingSchema, putInternalCustomersOnboardingSchema } from "./schema";

/**
 * Put Customer Onboarding
 */
export const putInternalCustomersOnboarding = async (args: PutInternalCustomersOnboardingSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.put('/internal/customers/onboarding', args);
  
  return JSON.stringify(result, null, 2);
};

export const putInternalCustomersOnboardingTool: ToolRegistration<PutInternalCustomersOnboardingSchema> = {
  name: "put_internal_customers_onboarding",
  description: "Updates a customer onboarding record. This customer onboarding record must exist before executing any operations that depend on the CustomerID.",
  inputSchema: putInternalCustomersOnboardingSchema,
  handler: async (args: PutInternalCustomersOnboardingSchema) => {
    try {
      const parsedArgs = putInternalCustomersOnboardingSchema.parse(args);
      const result = await putInternalCustomersOnboarding(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in putInternalCustomersOnboardingTool handler:", error);
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
