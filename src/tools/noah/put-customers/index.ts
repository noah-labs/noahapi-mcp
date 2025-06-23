import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type PutCustomersSchema, putCustomersSchema } from "./schema";

/**
 * Put Customer
 */
export const putCustomers = async (args: PutCustomersSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.put('/customers/{CustomerID}', args);
  
  return JSON.stringify(result, null, 2);
};

export const putCustomersTool: ToolRegistration<PutCustomersSchema> = {
  name: "put_customers",
  description: "Creates or updates a customer record. A unique CustomerID must be provided, as the API does not generate this identifier. For consistency, it is recommended to use the customer ID from your internal system as the CustomerID. This customer record must exist before executing any operations that depend on the CustomerID.",
  inputSchema: putCustomersSchema,
  handler: async (args: PutCustomersSchema) => {
    try {
      const parsedArgs = putCustomersSchema.parse(args);
      const result = await putCustomers(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in putCustomersTool handler:", error);
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
