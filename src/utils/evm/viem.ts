import { createPublicClient, http } from 'viem';
import type { PublicClient, Chain } from 'viem';

const networks: Record<string, Chain> = {
  monadTestnet: {
    id: 747,
    name: 'Flow EVM mainnet',
    nativeCurrency: { name: 'Flow token', symbol: 'FLOW', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://mainnet.evm.nodes.onflow.org'] }
    }
  }
};

export function getPublicClient(networkName: keyof typeof networks = 'monadTestnet'): PublicClient {
  const network = networks[networkName];
  if (!network) {
    throw new Error(`Network ${networkName} not found in configuration`);
  }

  return createPublicClient({
    chain: network,
    transport: http(network.rpcUrls.default.http[0])
  });
} 