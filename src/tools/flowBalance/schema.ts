import { z } from 'zod';
import type { Network } from '@/utils/fclConfig';

export const flowBalanceSchema = z.object({
  address: z.string().describe('Flow address to check balance for'),
  network: z.enum(['mainnet', 'testnet'] as const).default('mainnet').describe('Flow network to use'),
});

export type FlowBalanceSchema = z.infer<typeof flowBalanceSchema>; 