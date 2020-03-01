import { getTokenAddress } from "./tokens";
export const NETWORK_ID = 42;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const RPC_URL = process.env.RPC_URL!;

export const BUY_TOKEN_ADDRESS = getTokenAddress("MKR");
export const SELL_TOKEN_ADDRESS = getTokenAddress("DAI");

if (!PRIVATE_KEY) {
  throw new Error("Please specify a private key");
}

if (!PUBLIC_KEY) {
  throw new Error("Please specify a public key");
}

if (!RPC_URL) {
  throw new Error("Please specify a RPC URL");
}
