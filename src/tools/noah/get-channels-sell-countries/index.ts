import type { ToolRegistration } from "@/types/tools";
import { type GetChannelsSellCountriesSchema, getChannelsSellCountriesSchema } from "./schema";
import { noahClient } from "../../../utils/noah-client";

/**
 * Get Sell Channels Countries
 */
export const getChannelsSellCountries = async (args: GetChannelsSellCountriesSchema): Promise<string> => {
  try {
    const response = await noahClient.get("/channels/sell/countries", args);

    if (response.error) {
      return JSON.stringify(
        {
          error: true,
          message: response.error.message,
          details: response.error.details,
        },
        null,
        2,
      );
    }

    return JSON.stringify(
      {
        success: true,
        data: response.data,
        summary: "Successfully retrieved sell channels countries",
      },
      null,
      2,
    );
  } catch (error) {
    return JSON.stringify(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      null,
      2,
    );
  }
};

export const getChannelsSellCountriesTool: ToolRegistration<GetChannelsSellCountriesSchema> = {
  name: "get_channels_sell_countries",
  description:
    "This endpoint retrieves the complete list of countries where Sell operations are supported. The response is useful for enabling customers to select their desired Country+FiatCurrency combination for receiving payouts. After making a selection, obtain the channels for the chosen Country+FiatCurrency using GET /channels/sell. Follow the step-by-step guides:  [Direct Payout to US Business](../recipes/payout/global-payouts-business)  [Direct Payout to Individual Customer](../recipes/payout/global-payouts-individual)",
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
