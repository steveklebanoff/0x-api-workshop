import { Web3Wrapper } from "@0x/web3-wrapper";
import { BigNumber } from "@0x/utils";
import { ContractWrappers } from "@0x/contract-wrappers";

import { checkAndSetAllowance } from "./allowances";
import {
  NETWORK_ID,
  PUBLIC_KEY,
} from "./constants";
import { getProviderEngine } from "./provider";
import { trade } from "./trade";
import { getTokenAddress } from "./tokens";

const start = async () => {
  const buyTokenAddress = getTokenAddress("REP");
  const sellTokenAddress = getTokenAddress("DAI");
  const sellTokenUnitAmount = 0.25;

  // Set up wallet and provider
  const providerEngine = getProviderEngine();
  const contractWrappers = new ContractWrappers(providerEngine, {
    chainId: NETWORK_ID
  });
  const web3Wrapper = new Web3Wrapper(providerEngine);

  // Ensure we have allowances set
  await checkAndSetAllowance(sellTokenAddress, contractWrappers, providerEngine);

  // Send out trade
  const sellTokenAmountWei = Web3Wrapper.toWei(new BigNumber(sellTokenUnitAmount)).toNumber();
  await trade(
    web3Wrapper, PUBLIC_KEY,
    { buyTokenAddress: buyTokenAddress, sellTokenAddress: sellTokenAddress },
    sellTokenAmountWei
  );
};

start().then(() => {
  console.log("Script ended successfully");
  process.exit();
}).catch(e => {
  console.log("Got an error:");
  console.log(e);
});
