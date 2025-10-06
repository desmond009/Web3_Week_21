import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/6mFCPorjtiIGk-WlzevtyUEXl0xHqseb");

async function pollBlock(blockNumber: number) {
    const logs = await provider.getLogs({
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        fromBlock: blockNumber,
        toBlock: blockNumber,
        topics: [id('Transfer(address,address,uint256)')]
    })

    console.log(logs);
}   

// Create a function that lets the user poll from the genises to the current block
async function main () {
    const currentBlock = 1;

    while(1){
        await pollBlock(currentBlock)
    }
}

main()


