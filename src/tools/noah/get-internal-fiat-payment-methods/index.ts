import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalFiatPaymentMethodsSchema, getInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Payment Methods
 */
export const getInternalFiatPaymentMethods = async (args: GetInternalFiatPaymentMethodsSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/fiat-payment-methods');
  
  return JSON.stringify(result, null, 2);
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
