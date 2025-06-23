import type { ToolRegistration } from "@/types/tools";
import { type GetPaymentMethodsSchema, getPaymentMethodsSchema } from "./schema";

/**
 * Payment Methods
 */
export const getPaymentMethods = async (args: GetPaymentMethodsSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /payment-methods
  
  console.log('Noah API call:', { method: 'GET', path: '/payment-methods', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /payment-methods",
    args
  });
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
