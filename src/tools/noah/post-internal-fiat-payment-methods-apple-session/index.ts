import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PostInternalFiatPaymentMethodsAppleSessionSchema, postInternalFiatPaymentMethodsAppleSessionSchema } from "./schema";

/**
 * Create a merchant session with apple
 */
export const postInternalFiatPaymentMethodsAppleSession = async (args: PostInternalFiatPaymentMethodsAppleSessionSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.post('/internal/fiat-payment-methods/apple-session', args);
  
  return JSON.stringify(result, null, 2);
};

export const postInternalFiatPaymentMethodsAppleSessionTool: ToolRegistration<PostInternalFiatPaymentMethodsAppleSessionSchema> = {
  name: "post_internal_fiat_payment_methods_apple_session",
  description: "Create an ApplePay session to authenticate card payments using Touch ID or Face ID. This eliminates the need to manually enter card and shipping details.",
  inputSchema: postInternalFiatPaymentMethodsAppleSessionSchema,
  handler: async (args: PostInternalFiatPaymentMethodsAppleSessionSchema) => {
    try {
      const parsedArgs = postInternalFiatPaymentMethodsAppleSessionSchema.parse(args);
      const result = await postInternalFiatPaymentMethodsAppleSession(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in postInternalFiatPaymentMethodsAppleSessionTool handler:", error);
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
