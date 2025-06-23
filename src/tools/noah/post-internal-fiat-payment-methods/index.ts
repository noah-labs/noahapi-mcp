import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalFiatPaymentMethodsSchema, postInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Fiat Payment Method
 */
export const postInternalFiatPaymentMethods = async (args: PostInternalFiatPaymentMethodsSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/fiat-payment-methods', args);
  
  return JSON.stringify(result, null, 2);
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
