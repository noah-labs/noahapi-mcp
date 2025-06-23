import { z } from "zod";

export const postCheckoutPayinFiatSchema = z.object({
  PaymentMethodCategory: z.string(),
  FiatCurrency: z.enum(["AED", "ARS", "AUD", "BDT", "BHD", "BMD", "BRL", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "ETB", "EUR", "GBP", "GHS", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "KWD", "LKR", "MMK", "MWK", "MXN", "MYR", "NGN", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "RWF", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "UGX", "USD", "VEF", "VND", "XAF", "XOF", "ZAR"]),
  CryptoCurrency: z.string(),
  FiatAmount: z.string(),
  ReturnURL: z.string(),
  ExternalID: z.string().optional(),
  CustomerID: z.string().describe("Identifies the customer in business' system"),
  Customer: z.record(z.unknown()).optional(),
  LineItems: z.array(z.object({
  Description: z.string().describe("Description of the line item."),
  Quantity: z.string().describe("Quantity of the line item. Must be greater than zero."),
  UnitAmount: z.string().describe("Amount of a single unit of the line item. Must be in the same currency as the transaction."),
  TotalAmount: z.string().describe("Total amount of the line item (UnitAmount * Quantity). Must be in the same currency as the transaction.")
})).describe("List of line items that your customer is purchasing using this Hosted Checkout Session. This is used for display purposes for the customer during Checkout as well as remediation of disputed payments. We do not make any calculations using this data."),
  Nonce: z.string()
});

export type PostCheckoutPayinFiatSchema = z.infer<typeof postCheckoutPayinFiatSchema>;
