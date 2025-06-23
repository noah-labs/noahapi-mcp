import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type DeleteInternalFiatPaymentMethodsSchema, deleteInternalFiatPaymentMethodsSchema } from "./schema";

/**
 * Delete Fiat Payment Method
 */
export const deleteInternalFiatPaymentMethods = async (args: DeleteInternalFiatPaymentMethodsSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.delete('/internal/fiat-payment-methods/{ID}');
  
  return JSON.stringify(result, null, 2);
};

export const deleteInternalFiatPaymentMethodsTool: ToolRegistration<DeleteInternalFiatPaymentMethodsSchema> = {
  name: "delete_internal_fiat_payment_methods",
  description: "Deletes a fiat payment method for the customer",
  inputSchema: deleteInternalFiatPaymentMethodsSchema,
  handler: async (args: DeleteInternalFiatPaymentMethodsSchema) => {
    try {
      const parsedArgs = deleteInternalFiatPaymentMethodsSchema.parse(args);
      const result = await deleteInternalFiatPaymentMethods(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in deleteInternalFiatPaymentMethodsTool handler:", error);
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
