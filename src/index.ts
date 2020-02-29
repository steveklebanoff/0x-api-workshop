import { ERC20TokenContract, ContractWrappers } from "@0x/contract-wrappers";
import { TxData, Web3Wrapper } from "@0x/web3-wrapper";
import {
  RPCSubprovider,
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  DebugSubprovider
} from "@0x/subproviders";
import { BigNumber } from "@0x/utils";

const LOW_ALLOWANCE_IN_WEI = new BigNumber(2).pow(128).minus(1);
const UNLIMITED_ALLOWANCE_IN_WEI = new BigNumber(2).pow(256).minus(1);

const NETWORK_ID = 42;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Kovan addresses
// WETH 0xd0a1e359811322d97991e03f863a0c30c2cf029c
// MKR  0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd
// REP  0x4e5cb5a0caca30d1ad27d8cd8200a907854fb518

const BUY_TOKEN = "0xaaf64bfcc32d0f15873a02163e7e500671a4ffcd";
const SELL_TOKEN = "0x4e5cb5a0caca30d1ad27d8cd8200a907854fb518";

if (!PRIVATE_KEY) {
  throw new Error("Please specify a private key");
}
if (!PUBLIC_KEY) {
  throw new Error("Please specify a public key");
}

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) {
  throw new Error("Please specify a RPC URL");
}

const getProviderEngine = () => {
  const providerEngine = new Web3ProviderEngine();

  const privateKeyProvider = new PrivateKeyWalletSubprovider(PRIVATE_KEY);
  providerEngine.addProvider(privateKeyProvider);

  const rpcProvider = new RPCSubprovider(RPC_URL);
  providerEngine.addProvider(rpcProvider);

  providerEngine.start();
  return providerEngine;
};
const providerEngine = getProviderEngine();
const contractWrappers = new ContractWrappers(providerEngine, {
  chainId: NETWORK_ID
});

const checkAndSetAllowance = async () => {
  const sellToken = new ERC20TokenContract(SELL_TOKEN, providerEngine, {
    from: PUBLIC_KEY
  });
  const zeroExTokenSpender = contractWrappers.contractAddresses.erc20Proxy;

  const currentAllowance = await sellToken
    .allowance(PUBLIC_KEY, zeroExTokenSpender)
    .callAsync();

  if (currentAllowance.lt(LOW_ALLOWANCE_IN_WEI)) {
    console.log("Setting allowance..");
    console.log(`Setting on ${SELL_TOKEN} to allow ${zeroExTokenSpender}`);

    const res = await sellToken
      .approve(zeroExTokenSpender, UNLIMITED_ALLOWANCE_IN_WEI)
      .awaitTransactionSuccessAsync({ from: PUBLIC_KEY });

    console.log(`Set allowance: ${res.transactionHash}`);
    return;
  }
  console.log(`Allowance is ${currentAllowance}, no need to set.`);
};

const start = async () => {
  await checkAndSetAllowance();
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
