export const NETWORK_ID = 42;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const RPC_URL = process.env.RPC_URL!;

// Kovan addresses
// WETH 0xd0a1e359811322d97991e03f863a0c30c2cf029c
// MKR  0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd
// REP  0x4e5cb5a0caca30d1ad27d8cd8200a907854fb518
// DAI  0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa
export const BUY_TOKEN = "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd";
export const SELL_TOKEN = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";

if (!PRIVATE_KEY) {
  throw new Error("Please specify a private key");
}

if (!PUBLIC_KEY) {
  throw new Error("Please specify a public key");
}

if (!RPC_URL) {
  throw new Error("Please specify a RPC URL");
}
