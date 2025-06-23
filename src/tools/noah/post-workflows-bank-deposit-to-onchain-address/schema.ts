import { z } from "zod";

export const postWorkflowsBankDepositToOnchainAddressSchema = z.object({
  CustomerID: z.string(),
  FiatCurrency: z.enum(["AED", "ARS", "AUD", "BDT", "BHD", "BMD", "BRL", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "ETB", "EUR", "GBP", "GHS", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "KWD", "LKR", "MMK", "MWK", "MXN", "MYR", "NGN", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "RWF", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "UGX", "USD", "VEF", "VND", "XAF", "XOF", "ZAR"]),
  CryptoCurrency: z.string(),
  Network: z.enum(["Bitcoin", "BitcoinTest", "Ethereum", "EthereumTestSepolia", "Lightning", "LightningTest", "OffNetwork", "PolygonPos", "PolygonTestAmoy", "PolygonTestMumbai", "Solana", "SolanaDevnet", "Tron", "TronTestShasta"]),
  DestinationAddress: z.object({
  Address: z.string()
}).describe("The final destination address to which the crypto currency should be transferred.")
});

export type PostWorkflowsBankDepositToOnchainAddressSchema = z.infer<typeof postWorkflowsBankDepositToOnchainAddressSchema>;
