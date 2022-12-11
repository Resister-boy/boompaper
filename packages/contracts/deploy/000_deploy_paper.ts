import { ethers , network} from "hardhat";
import { writeFileSync, readFileSync } from "fs";
import * as path from "path";
//import * as process from "process";

async function main() {
  const chainId = network.config.chainId;
  console.log("deploying chain:", chainId);

  const accounts = await ethers.getSigners();

  const paperManagerContractFactory = await ethers.getContractFactory("PaperManager");
  // contructor 있을때 사용
  const paperManagerContract = await paperManagerContractFactory.deploy();
  await paperManagerContract.deployed();
  console.log("Contract paperManager deployed to:", paperManagerContract.address);


  const paperContractFactory = await ethers.getContractFactory("Paper");
  // contructor 있을때 사용
  const paperContract = await paperContractFactory.deploy("Happy Birthday~","HBD");
  await paperContract.deployed();
  console.log("Contract Paper deployed to:", paperContract.address);
  

  // const nftJson = JSON.parse(
  //   readFileSync(
  //     path.resolve(__dirname, "../client", "lib", "PaperNFT.json"),
  //     "utf8"
  //   )
  // );
  const paperManagerJson = JSON.parse(
    readFileSync(
      path.resolve(__dirname, "../../web", "lib", "PaperManager.json"),
      "utf8"
    )
  );

  const paperManagerAbi = {
    address: paperManagerContract.address,
    abi: JSON.parse(paperManagerContract.interface.format("json") as string),
  };

  paperManagerJson[chainId!.toString()] = paperManagerAbi;

  writeFileSync(
    path.resolve(__dirname, "../../web", "lib", "PaperManager.json"),
    JSON.stringify(paperManagerJson, null, 2)
  );

  ////

  /////

  const paperJson = JSON.parse(
    readFileSync(
      path.resolve(__dirname, "../../web", "lib", "Paper.json"),
      "utf8"
    )
  );

  const paperAbi = {
    address: paperContract.address,
    abi: JSON.parse(paperContract.interface.format("json") as string),
  };

  paperJson[chainId!.toString()] = paperAbi;

  writeFileSync(
    path.resolve(__dirname, "../../web", "lib", "Paper.json"),
    JSON.stringify(paperJson, null, 2)
  );

  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
