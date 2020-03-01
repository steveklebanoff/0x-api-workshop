import {
  RPCSubprovider,
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  NonceTrackerSubprovider
} from "@0x/subproviders";
import { PRIVATE_KEY, RPC_URL } from "./constants";

export const getProviderEngine = () => {
  const providerEngine = new Web3ProviderEngine();

  providerEngine.addProvider(new NonceTrackerSubprovider());

  const privateKeyProvider = new PrivateKeyWalletSubprovider(PRIVATE_KEY);
  providerEngine.addProvider(privateKeyProvider);

  const rpcProvider = new RPCSubprovider(RPC_URL);
  providerEngine.addProvider(rpcProvider);

  providerEngine.start();
  return providerEngine;
};
