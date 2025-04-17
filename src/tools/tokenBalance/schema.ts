import { z } from 'zod';
import type { Network } from '@/utils/fclConfig';

export const tokenBalanceSchema = z.object({
  address: z.string().describe('Flow address to check balance for'),
  tokenIdentifier: z.string().describe('Identifier of the token to check balance for'),
  network: z.enum(['mainnet', 'testnet'] as const).default('mainnet').describe('Flow network to use'),
});

export type TokenBalanceSchema = z.infer<typeof tokenBalanceSchema>; 