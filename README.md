# 0x API Workshop

## Requirements

- Ensure you have node 8 or above.  If you don't, I recommend using [nvm](https://github.com/nvm-sh/nvm) to manage multiple node versions
- Ensure you have [yarn](https://yarnpkg.com/) installed

## Running

- Install dependencies: `yarn`
- `cp .env.example .env` and replace variables with your own
- Ensure you have enough of the Kovan assets specified in `index.ts` to make the trade
- Run `yarn dev`


## Follow-up challenges

- Buy another asset
- Modify code so you can specify a buy amount _or_ a sell amount
- Send in a custom slippage parameter
- Ensure wallet has enough funds prior to calling out to 0x API
- Wait for certain number of block confirmations prior to considering transaction successful
- Query for exact token changes that occurred after successful transactions
- Retry X times with X delay if reverts