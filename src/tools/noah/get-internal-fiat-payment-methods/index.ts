import type { ToolRegistration } from "@/types/tools";
import { type GetInternalFiatPaymentMethodsSchema, getInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Payment Methods
 */
export const getInternalFiatPaymentMethods = async (args: GetInternalFiatPaymentMethodsSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /internal/fiat-payment-methods
  
  console.log('Noah API call:', { method: 'GET', path: '/internal/fiat-payment-methods', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /internal/fiat-payment-methods",
    args
  });
};

export const getInternalFiatPaymentMethodsTool: ToolRegistration<GetInternalFiatPaymentMethodsSchema> = {
  name: "get_internal_fiat_payment_methods",
  description: "Retrieves all fiat payment methods of the customer",
  inputSchema: getInternalFiatPaymentMethodsSchema,
  handler: async (args: GetInternalFiatPaymentMethodsSchema) => {
    try {
      const parsedArgs = getInternalFiatPaymentMethodsSchema.parse(args);
      const result = await getInternalFiatPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalFiatPaymentMethodsTool handler:", error);
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
