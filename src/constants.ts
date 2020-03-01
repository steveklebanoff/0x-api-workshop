
export const NETWORK_ID = 42;

export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
if (!PUBLIC_KEY) { throw new Error("Please specify a public key"); }

export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
if (!PRIVATE_KEY) { throw new Error("Please specify a private key"); }

export const RPC_URL = process.env.RPC_URL!;
if (!RPC_URL) { throw new Error("Please specify a RPC URL"); }
