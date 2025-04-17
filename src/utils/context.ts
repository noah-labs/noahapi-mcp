import { type Network, networkName } from "./config";
import { FlowConnector, FlowWallet } from "./flow";
import type { FlowBlockchainContext } from "./types";

import flowJSON from "../../flow.json" assert { type: "json" };

export async function buildBlockchainContext(
	network: Network = networkName,
): Promise<FlowBlockchainContext> {
	const connector = new FlowConnector(flowJSON, network);
	let wallet: FlowWallet | undefined = undefined;
	try {
		wallet = new FlowWallet(connector);
	} catch (_e) {
		// No need to log error here, it's probably because the wallet is not set
	}
	return { connector, wallet };
}
