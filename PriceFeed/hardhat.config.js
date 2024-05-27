require("@nomicfoundation/hardhat-toolbox");


const Private_Key = "35196c368bfbd9d58c174f05d5335fbb61f6294056d46337856f8b6a55f49b42"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    shimmer:{
      url: "https://json-rpc.evm.testnet.shimmer.network/",
      accounts:[`0x${Private_Key}`],
      chainId: 1072
    }
  }
};
