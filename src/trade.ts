import { Web3Wrapper } from "@0x/web3-wrapper";
import axios from "axios";
import pick from "lodash/pick";

interface ZeroExAPIResponse {
  price: string;
  to: string;
  data: string;
  value: string;
  gas?: string;
  gasPrice: string;
  protocolFee: string;
  buyAmount: string;
  sellAmount: string;
  orders: any[];
  sources: [{ name: string; proportion: string }][];
}

export const trade = async (
  web3Wrapper: Web3Wrapper,
  takerAddress: string,
  addresses: { buyTokenAddress: string; sellTokenAddress: string },
  sellTokenAmountWei: number
) => {
  const url = `https://kovan.api.0x.org/swap/v0/quote?buyToken=${addresses.buyTokenAddress}&sellToken=${addresses.sellTokenAddress}&sellAmount=${sellTokenAmountWei}&takerAddress=${takerAddress}`;
  console.log(`Fetching API request from ${url}.`);

  const zeroExApiRequest = await axios.get<ZeroExAPIResponse>(url);
  const zeroExApiResponse = zeroExApiRequest.data;
  console.log('Got API response:', pick(zeroExApiResponse, "buyAmount", "sellAmount", "gasPrice", "gas", "protocolFee", "sources", "to"));

  const sentTxn = await web3Wrapper.sendTransactionAsync({
    ...zeroExApiResponse,
    from: takerAddress
  });
  console.log("Sent transaction, waiting for successful response...", `https://kovan.etherscan.io/tx/${sentTxn}`);
  await web3Wrapper.awaitTransactionSuccessAsync(sentTxn);
  console.log("Transaction successful!", sentTxn);
};
