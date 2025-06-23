import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetPaymentMethodsSchema, getPaymentMethodsSchema } from "./schema";

/**
 * Payment Methods
 */
export const getPaymentMethods = async (args: GetPaymentMethodsSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/payment-methods');
  
  return JSON.stringify(result, null, 2);
};

export const getPaymentMethodsTool: ToolRegistration<GetPaymentMethodsSchema> = {
  name: "get_payment_methods",
  description: "Retrieves a list of payment methods for a specific customer.",
  inputSchema: getPaymentMethodsSchema,
  handler: async (args: GetPaymentMethodsSchema) => {
    try {
      const parsedArgs = getPaymentMethodsSchema.parse(args);
      const result = await getPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getPaymentMethodsTool handler:", error);
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
