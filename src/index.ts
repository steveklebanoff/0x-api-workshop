import { TxData, Web3Wrapper } from "@0x/web3-wrapper";
import {
  RPCSubprovider,
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider
} from "@0x/subproviders";

const NETWORK_ID = 42;
const RPC_URL = "https://api.infura.io/v1/jsonrpc/kovan";
const PRIVATE_KEY = process.env.KOVAN_KEY;

console.log("Starting...");

const getProviderEngine = () => {
  if (!PRIVATE_KEY) {
    throw new Error("Please specify a private key");
  }
  const providerEngine = new Web3ProviderEngine();

  const rpcProvider = new RPCSubprovider(RPC_URL);
  providerEngine.addProvider(rpcProvider);

  const privateKeyProvider = new PrivateKeyWalletSubprovider(PRIVATE_KEY);
  providerEngine.addProvider(privateKeyProvider);

  providerEngine.start();
  return providerEngine;
};
