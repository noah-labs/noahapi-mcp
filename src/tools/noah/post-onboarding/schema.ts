import { z } from "zod";

export const postOnboardingSchema = z.object({

  CustomerID: z.string()
,

  Metadata: z.record(z.unknown()).optional().describe("Custom user defined key value pairs used for storing additional information."),
  ReturnURL: z.string(),
  FiatOptions: z.array(z.object({
  FiatCurrencyCode: z.string()
})).describe("List of fiat options to be supported by the customer."),
  Form: z.record(z.unknown()).optional()

});

export type PostOnboardingSchema = z.infer<typeof postOnboardingSchema>;
