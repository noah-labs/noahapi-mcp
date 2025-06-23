import { z } from "zod";

export const getInternalChannelsSellSchema = z.object({
  Country: z.string().optional(),
  CryptoCurrency: z.string(),
  FiatCurrency: z.enum(["AED", "ARS", "AUD", "BDT", "BHD", "BMD", "BRL", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "ETB", "EUR", "GBP", "GHS", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "KWD", "LKR", "MMK", "MWK", "MXN", "MYR", "NGN", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "RWF", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "UGX", "USD", "VEF", "VND", "XAF", "XOF", "ZAR"]).optional(),
  FiatAmount: z.string().optional(),
  PaymentMethodID: z.string().optional(),
  PageSize: z.number().optional(),
  PageToken: z.string().optional()
});

export type GetInternalChannelsSellSchema = z.infer<typeof getInternalChannelsSellSchema>;
