const hre = require("hardhat");
const { EvmPriceServiceConnection } = require("@pythnetwork/pyth-evm-js");
const IPyth = require("/home/jabrane/PriceFeed/artifacts/@pythnetwork/pyth-sdk-solidity/IPyth.sol/IPyth.json")

const shimmer_address = "https://json-rpc.evm.testnet.shimmer.network/"

async function main(){

  const { ethers } = hre;
  const provider = new ethers.JsonRpcProvider(
    shimmer_address,
    1072
  );
  
  const [deployer,] = await ethers.getSigners();

  const connection = new EvmPriceServiceConnection(
    "https://xc-testnet.pyth.network"
  );

  const priceIds = ["0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b"];

  const priceUpdateData = await connection.getPriceFeedsUpdateData(priceIds);
  console.log(priceUpdateData);

  const pythContract = new ethers.Contract(
    "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    IPyth.abi,
    provider
  );

  const validTimePeriod = await pythContract.getValidTimePeriod();
  console.log(validTimePeriod);

  const updateFee = await pythContract.getUpdateFee(priceUpdateData);

  const PythOracle = await ethers.getContractFactory("PriceFeed");
  const pythOracle = await PythOracle.attach(
    "0x39E1a7b630B1BA971CB0e385528895371c861E35"
  );

  const price = await pythOracle.getBtcUsdPrice(priceUpdateData,{
    gasLimit: "1000000",
  });
  console.log("getPrice result:", await price.wait());


}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

