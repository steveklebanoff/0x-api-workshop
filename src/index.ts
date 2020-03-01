import { Web3Wrapper } from "@0x/web3-wrapper";
import { checkAndSetAllowance } from "./allowances";
import { ContractWrappers } from "@0x/contract-wrappers";
import {
  NETWORK_ID,
  SELL_TOKEN_ADDRESS,
  PUBLIC_KEY,
  BUY_TOKEN_ADDRESS,
  SELL_TOKEN_AMOUNT_WEI
} from "./constants";
import { getProviderEngine } from "./provider";
import { trade } from "./trade";

const start = async () => {
  // Set up wallet and provider
  const providerEngine = getProviderEngine();
  const contractWrappers = new ContractWrappers(providerEngine, {
    chainId: NETWORK_ID
  });
  const web3Wrapper = new Web3Wrapper(providerEngine);

  // Ensure we have allowances set
  await checkAndSetAllowance(SELL_TOKEN_ADDRESS, contractWrappers, providerEngine);

  // Send out trade
  await trade(
    web3Wrapper, PUBLIC_KEY,
    { buyTokenAddress: BUY_TOKEN_ADDRESS, sellTokenAddress: SELL_TOKEN_ADDRESS },
    SELL_TOKEN_AMOUNT_WEI
  );
};

start().then(() => {
  console.log("Script ended successfully");
  process.exit();
}).catch(e => {
  console.log("Got an error:");
  console.log(e);
});
