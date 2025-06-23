import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalPricesSchema, getInternalPricesSchema } from "./schema";

/**
 * Prices
 */
export const getInternalPrices = async (args: GetInternalPricesSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/prices');
  
  return JSON.stringify(result, null, 2);
};

export const getInternalPricesTool: ToolRegistration<GetInternalPricesSchema> = {
  name: "get_internal_prices",
  description: "Allows you to retrieve real-time information about a conversion between two supported currencies, including the rate before and after the NOAH Fee is applied. During a NOAH Hosted Checkout session, real-time ‘/prices’ data is used to calculate the fees and thus the final amount a customer will pay. In case neither SourceAmount or DestinationAmount is defined the fee is not available.",
  inputSchema: getInternalPricesSchema,
  handler: async (args: GetInternalPricesSchema) => {
    try {
      const parsedArgs = getInternalPricesSchema.parse(args);
      const result = await getInternalPrices(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalPricesTool handler:", error);
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
