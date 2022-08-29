# Send Signed Transaction using Ethereum API

This repo provides examples of sending signed transaction using Ethereum API.

1. Install npm packages. (NodeJS version: v16.14.2)
```
npm install
```
2. Copy and paste .env.template and rename it to .env.
```
cp .env.template .env

```
3. Update PRIVATE_KEY.
```
PRIVATE_KEY={PRIVATE_KEY}
RPC_URL_GOERLI=https://rpc.ankr.com/eth_goerli
RPC_URL_BAOBAB=https://public-node-api.klaytnapi.com/v1/baobab
BLOCK_EXPLORER_BAOBAB=https://baobab.klaytnfinder.io/tx/
BLOCK_EXPLORER_GOERLI=https://goerli.etherscan.io/tx/
```

4. Run example codes.
```
// Ethers.js
node ethers_sendTx.js

// web3.js
node web3_sendTx.js
```
