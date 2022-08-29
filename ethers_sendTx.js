// Reference(sendTx using ethers.js): https://ethereum.org/da/developers/tutorials/send-token-etherjs/

const ethers = require('ethers');
require('dotenv').config();

const network = "baobab"; // baobab or goerli
const rpcUrl = network === "baobab" ? process.env.RPC_URL_BAOBAB : process.env.RPC_URL_GOERLI;
const blockExplorer = network === "baobab" ? process.env.BLOCK_EXPLORER_BAOBAB : process.env.BLOCK_EXPLORER_GOERLI;
const unit =  network === "baobab" ? "KLAY" : "GoerliETH";

async function main(){
    try {
        const HTTPSProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const address = wallet.address

        // Get Balance
        const balance = await HTTPSProvider.getBalance(address)
        console.log(`Current balance of ${address}: ${balance*(10**(-18))} ${unit}`)

        // Get latest nonce
        const nonce = await HTTPSProvider.getTransactionCount(address)
        console.log(`nonce: ${nonce}`)

        // Get Chain ID
        const { chainId } = await HTTPSProvider.getNetwork()

        // Get Gas Price
        const gasPrice = await HTTPSProvider.getGasPrice();

        // Sign Transaction
        const transaction = {
            chainId: chainId,
            to: address,
            value: 0,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: 21000,
        }
        const signedTx = await wallet.signTransaction(transaction);

        // Send Signed Transaction
        const response = await (await HTTPSProvider.sendTransaction(signedTx)).wait(); //default confirmation number = 1
        console.log(`Block Explorer: ${blockExplorer}${response.transactionHash}`);

    } catch (err){
        console.log(err.toString())
    }
}

main();