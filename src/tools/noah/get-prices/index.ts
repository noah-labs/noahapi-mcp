import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetPricesSchema, getPricesSchema } from "./schema";

/**
 * Prices
 */
export const getPrices = async (args: GetPricesSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/prices');
  
  return JSON.stringify(result, null, 2);
};

export const getPricesTool: ToolRegistration<GetPricesSchema> = {
  name: "get_prices",
  description: "Allows you to retrieve real-time information about a conversion between two supported currencies, including the rate before and after the NOAH Fee is applied. During a NOAH Hosted Checkout session, real-time ‘/prices’ data is used to calculate the fees and thus the final amount a customer will pay. In case neither SourceAmount or DestinationAmount is defined the fee is not available.",
  inputSchema: getPricesSchema,
  handler: async (args: GetPricesSchema) => {
    try {
      const parsedArgs = getPricesSchema.parse(args);
      const result = await getPrices(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getPricesTool handler:", error);
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
