async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
  "Deploying contracts with the account:",
  deployer.address
  );


  const PriceFeed = await ethers.getContractFactory("PriceFeed");
  const contract = await PriceFeed.deploy("0x5f3c61944CEb01B3eAef861251Fb1E0f14b848fb");

  console.log("Contract deployed at:", contract.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});