import { checkAndSetAllowance } from "./allowances";
import { ContractWrappers } from "@0x/contract-wrappers";
import { NETWORK_ID, SELL_TOKEN_ADDRESS } from "./constants";
import { getProviderEngine } from "./provider";

const start = async () => {
  const providerEngine = getProviderEngine();
  const contractWrappers = new ContractWrappers(providerEngine, {
    chainId: NETWORK_ID
  });

  await checkAndSetAllowance(
    SELL_TOKEN_ADDRESS,
    contractWrappers,
    providerEngine
  );
};

start()
  .then(() => {
    console.log("Succeeded!");
    process.exit();
  })
  .catch(e => {
    console.log("Got an error:");
    console.log(e);
  });
