import { PUBLIC_KEY } from "./constants";
import { ERC20TokenContract, ContractWrappers } from "@0x/contract-wrappers";
import { TxData, Web3Wrapper } from "@0x/web3-wrapper";
import {
  RPCSubprovider,
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  NonceTrackerSubprovider,
  DebugSubprovider
} from "@0x/subproviders";
import { BigNumber } from "@0x/utils";

const LOW_ALLOWANCE_IN_WEI = new BigNumber(2).pow(128).minus(1);
const UNLIMITED_ALLOWANCE_IN_WEI = new BigNumber(2).pow(256).minus(1);

export const checkAndSetAllowance = async (
  sellTokenAddress: string,
  contractWrappers: ContractWrappers,
  providerEngine: Web3ProviderEngine
) => {
  const sellToken = new ERC20TokenContract(sellTokenAddress, providerEngine, {
    from: PUBLIC_KEY
  });
  const zeroExTokenSpender = contractWrappers.contractAddresses.erc20Proxy;

  const currentAllowance = await sellToken
    .allowance(PUBLIC_KEY, zeroExTokenSpender)
    .callAsync();

  if (currentAllowance.lt(LOW_ALLOWANCE_IN_WEI)) {
    console.log("Setting allowance..");
    console.log(
      `Setting on ${sellTokenAddress} to allow ${zeroExTokenSpender}`
    );

    const res = await sellToken
      .approve(zeroExTokenSpender, UNLIMITED_ALLOWANCE_IN_WEI)
      .awaitTransactionSuccessAsync({ from: PUBLIC_KEY });

    console.log(`Set allowance: ${res.transactionHash}`);
    return;
  }
  console.log(`Allowance is ${currentAllowance}, no need to set.`);
};
