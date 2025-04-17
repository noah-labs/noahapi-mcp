import { z } from 'zod';
import type { Network } from '@/utils/fclConfig';

export const coaAccountSchema = z.object({
  address: z.string().describe('Flow address to check COA account for'),
  network: z.enum(['mainnet', 'testnet'] as const).default('mainnet').describe('Flow network to use')
});

export type CoaAccountSchema = z.infer<typeof coaAccountSchema>; 