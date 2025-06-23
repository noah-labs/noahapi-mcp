import type { ToolRegistration } from "@/types/tools";
import { getNoahApiClient } from "@/utils/noah-api-client";
import { type GetChannelsSellCountriesSchema, getChannelsSellCountriesSchema } from "./schema";

/**
 * Supported Countries
 */
export const getChannelsSellCountries = async (args: GetChannelsSellCountriesSchema): Promise<string> => {
  const client = getNoahApiClient();
  
  const result = await client.get('/channels/sell/countries');
  
  return JSON.stringify(result, null, 2);
};

export const getChannelsSellCountriesTool: ToolRegistration<GetChannelsSellCountriesSchema> = {
  name: "get_channels_sell_countries",
  description: "Retrieve a complete list of countries where sell operations are supported. The response is useful for enabling customers to select their desired Country+FiatCurrency combination for receiving payouts. After making a selection, obtain the channels for the chosen Country+FiatCurrency using GET /channels/sell",
  inputSchema: getChannelsSellCountriesSchema,
  handler: async (args: GetChannelsSellCountriesSchema) => {
    try {
      const parsedArgs = getChannelsSellCountriesSchema.parse(args);
      const result = await getChannelsSellCountries(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getChannelsSellCountriesTool handler:", error);
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
