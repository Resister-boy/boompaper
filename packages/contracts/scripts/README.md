# deploy

## simple local test

* npx hardhat run scripts/deploy.ts

## matic testnet

* npx hardhat run scripts/deploy.ts --network mumbai

  * Contract deployed to: 0xBc07770758E5cc59A58CA1b88980c0CD24c56B0f
  * Contract deployed to: 0xE59723aDf45c6eF0897962B2Ca7154a8ccFd0682
  * Contract deployed to: 0x9A1A8dd6FcCA0467E9376AD08c656F929619E253
  * Contract deployed to: 0x67cEb330594c158836248fFb9543a9451cb75d3d
  * Contract deployed to: 0x13C83Fec687bCa217D90Faf4a96e002e5853E881

  * Contract deployed to: 0x40b210B8F8Fde0D125aC089FEcdd51997f57f61E
  * Contract deployed to: 0x3E489916bfDE0db4380358BdBE2575136c3c42Dd

* npx hardhat verify --network mumbai 0xBc07770758E5cc59A58CA1b88980c0CD24c56B0f

    * Error in plugin @nomiclabs/hardhat-etherscan: Missing or invalid ApiKey

* https://mumbai.polygonscan.com/address/0x1f293d01866aD86De3ec8f957071bC47E30BB9A6

* https://testnets.opensea.io

* mint.ts 에 있는 CONTRACT_ADDRESS 수정 
* npx hardhat run scripts/mint.ts --network mumbai

  * 되긴 되는데 이미지가 깨져서 mintTokenBasic 추가하여 확인중 
  * 잘 안됨 ;;

## matic mainnet?

* not yet



