import { z } from 'zod';

export const tokenBalanceSchema = z.object({
  address: z.string().describe('Flow address to check balance for'),
  network: z.enum(['mainnet', 'testnet'] as const).default('mainnet').describe('Flow network to use'),
});

export type TokenBalanceSchema = z.infer<typeof tokenBalanceSchema>; 