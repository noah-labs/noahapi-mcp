import type { ToolRegistration } from "@/types/tools";
import { type PostInternalFiatPaymentMethodsSchema, postInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Fiat Payment Method
 */
export const postInternalFiatPaymentMethods = async (args: PostInternalFiatPaymentMethodsSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: POST
  // Path: /internal/fiat-payment-methods
  
  console.log('Noah API call:', { method: 'POST', path: '/internal/fiat-payment-methods', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "POST /internal/fiat-payment-methods",
    args
  });
};

export const postInternalFiatPaymentMethodsTool: ToolRegistration<PostInternalFiatPaymentMethodsSchema> = {
  name: "post_internal_fiat_payment_methods",
  description: "Creates a new fiat payment method for the customer",
  inputSchema: postInternalFiatPaymentMethodsSchema,
  handler: async (args: PostInternalFiatPaymentMethodsSchema) => {
    try {
      const parsedArgs = postInternalFiatPaymentMethodsSchema.parse(args);
      const result = await postInternalFiatPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalFiatPaymentMethodsTool handler:", error);
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
