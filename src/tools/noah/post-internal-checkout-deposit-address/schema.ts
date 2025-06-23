import { z } from "zod";

export const postInternalCheckoutDepositAddressSchema = z.object({
  CryptoCurrency: z.string(),
  Network: z.enum(["Bitcoin", "BitcoinTest", "Ethereum", "EthereumTestSepolia", "Lightning", "LightningTest", "OffNetwork", "PolygonPos", "PolygonTestAmoy", "PolygonTestMumbai", "Solana", "SolanaDevnet", "Tron", "TronTestShasta"])
});

export type PostInternalCheckoutDepositAddressSchema = z.infer<typeof postInternalCheckoutDepositAddressSchema>;
