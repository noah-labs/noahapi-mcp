import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetInternalChannelsSellCountriesSchema, getInternalChannelsSellCountriesSchema } from "./schema";

/**
 * Supported Countries
 */
export const getInternalChannelsSellCountries = async (args: GetInternalChannelsSellCountriesSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/internal/channels/sell/countries');
  
  return JSON.stringify(result, null, 2);
};

export const getInternalChannelsSellCountriesTool: ToolRegistration<GetInternalChannelsSellCountriesSchema> = {
  name: "get_internal_channels_sell_countries",
  description: "Retrieve a complete list of countries where sell operations are supported. The response is useful for enabling customers to select their desired Country+FiatCurrency combination for receiving payouts. After making a selection, obtain the channels for the chosen Country+FiatCurrency using GET /channels/sell",
  inputSchema: getInternalChannelsSellCountriesSchema,
  handler: async (args: GetInternalChannelsSellCountriesSchema) => {
    try {
      const parsedArgs = getInternalChannelsSellCountriesSchema.parse(args);
      const result = await getInternalChannelsSellCountries(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getInternalChannelsSellCountriesTool handler:", error);
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
