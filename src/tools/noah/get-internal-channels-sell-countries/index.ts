import type { ToolRegistration } from "@/types/tools";
import { type GetInternalChannelsSellCountriesSchema, getInternalChannelsSellCountriesSchema } from "./schema";

/**
 * Supported Countries
 */
export const getInternalChannelsSellCountries = async (args: GetInternalChannelsSellCountriesSchema): Promise<string> => {
  // TODO: Implement Noah Business API call
  // Method: GET
  // Path: /internal/channels/sell/countries
  
  console.log('Noah API call:', { method: 'GET', path: '/internal/channels/sell/countries', args });
  
  // This is a placeholder implementation
  return JSON.stringify({
    message: "Noah Business API tool not yet implemented",
    endpoint: "GET /internal/channels/sell/countries",
    args
  });
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
