import type { ToolRegistration } from "@/types/tools";
import { type GetInternalPricesSchema, getInternalPricesSchema } from "./schema";

/**
 * Prices
 */
export const getInternalPrices = async (args: GetInternalPricesSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /internal/prices
  
  console.log('Noah API call:', { method: 'GET', path: '/internal/prices', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /internal/prices",
    args
  });
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
