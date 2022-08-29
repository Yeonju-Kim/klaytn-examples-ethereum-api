// Reference(sendTx using web3js): https://ethereum.org/en/developers/tutorials/sending-transactions-using-web3-and-alchemy/
// Reference(Goerli): https://github.com/eth-clients/goerli

const Web3 = require('web3');
require('dotenv').config();

const network = "baobab"; // baobab or goerli
const rpcUrl = network === "baobab" ? process.env.RPC_URL_BAOBAB : process.env.RPC_URL_GOERLI;
const blockExplorer = network === "baobab" ? process.env.BLOCK_EXPLORER_BAOBAB : process.env.BLOCK_EXPLORER_GOERLI;
const unit =  network === "baobab" ? "KLAY" : "GoerliETH";

async function main () {
    const web3 = new Web3(rpcUrl);
    const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    const address = signer.address;

    // Get balance
    const balance = await web3.eth.getBalance(address);
    console.log(`balance of address(${address}): ${balance*(10**(-18))} ${unit}`)

    // Get latest nonce
    const nonce = await web3.eth.getTransactionCount(address);
    console.log(`nonce: ${nonce}`)

    const transaction = {
        to: address,
        value: 0,
        nonce: nonce,
        gas: 21000,
    }

    // Sign transaction
    const signedTx = await signer.signTransaction(transaction);

    // Send signed transaction
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
        if (!error){
            console.log(`Block Explorer: ${blockExplorer}${hash}`)
        }
        else{
            console.log(error)
        }
    })
}

main();