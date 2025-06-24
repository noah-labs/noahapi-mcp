import type { ToolRegistration } from "@/types/tools";
import { type GetPricesSchema, getPricesSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Prices
 */
export const getPrices = async (args: GetPricesSchema): Promise<string> => {
  try {
    const response = await noahClient.get('/prices', args);
    
    if (response.error) {
      return JSON.stringify({
        error: true,
        message: response.error.message,
        details: response.error.details,
      }, null, 2);
    }

    const data = response.data as any;
    return JSON.stringify({
      success: true,
      data: response.data,
      summary: `Retrieved pricing for ${args.SourceCurrency} to ${args.DestinationCurrency}`,
      conversionRate: data?.Items?.[0]?.Rate || 'N/A',
    }, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }, null, 2);
  }
};

export const getPricesTool: ToolRegistration<GetPricesSchema> = {
  name: "get_prices",
  description: "Allows you to retrieve real-time information about a conversion between two supported currencies, including the rate before and after the NOAH Fee is applied. During a NOAH Hosted Checkout session, real-time '/prices' data is used to calculate the fees and thus the final amount a customer will pay. In case neither SourceAmount or DestinationAmount is defined the fee is not available.",
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
