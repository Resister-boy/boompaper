import { ethers , network} from "hardhat";

// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const WALLET_ADDRESS = process.env.WALLET_PRIVATE_KEY;
// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// hardhat 이 abi json 파일을 만들어주는구나! 
// artifacts 라는 폴더에 저장되어 있다!

// test mint PaperNFT
async function main() {
    const paperNftContractFactory = await ethers.getContractFactory("PaperNFT");

    const paperNFTContract = paperNftContractFactory.attach(CONTRACT_ADDRESS);

    const payload = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 500 500">
    <style>.b { fill: white; font-family: serif; font-size: 14px; }</style>
    <rect width="100%" height="100%" fill="black" />
    <text x="10%" y="20%" class="b">You are my first Love!</text>
  </svg>`;
    //const paperNFTContract = require("../artifacts/contracts/PaperNFT.sol/PaperNFT.json");
    console.log(paperNFTContract);
    //const contractInterface = paperNFTContract.abi;
    //console.log(contractInterface);

    //let provider = ethers.provider;//ethers.getDefaultProvider(network.name);
    //console.log(provider);
    const provider = new ethers.providers.StaticJsonRpcProvider();

    const ownerSigningWallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

    //const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY);
    //console.log(wallet);
    
    const signer = ownerSigningWallet.connect(provider);//ethers.getDefaultProvider(network.name));
    //console.log(signer);

    // const nft = new ethers.Contract(CONTRACT_ADDRESS, contractInterface, signer);

    // const { deployer } = await getNamedAccounts();
    // const signer = await ethers.getSigner(deployer);

    // const contractName = 'Sample';
    // const deployment = await deployments.get(contractName);
    // const contract = new ethers.Contract(deployment.address, deployment.abi, signer);
    
    const txn1 = await paperNFTContract.mintTokenBySvg(payload);
    console.log("tx1:",txn1.hash);
    //const txn = await paperNFTContract['mintTokenBySvgTo(address,string)'](WALLET_ADDRESS,payload);
    
    //console.log(txn.hash);
    //console.log(txn);

    // https://testnets.opensea.io/assets/mumbai/0x9a1a8dd6fcca0467e9376ad08c656f929619e253/1 
    // 이렇게 나오긴 한다.
    const txn2 = await paperNFTContract.mintTokenBySvgTo(WALLET_ADDRESS,payload);
    console.log("tx2:",txn2.hash);

    const txn3 = await paperNFTContract.mintTokenBasic(WALLET_ADDRESS);
    console.log("tx3:",txn3.hash);

    const txn4 = await paperNFTContract.mintTokenTextBasic(WALLET_ADDRESS);
    console.log("tx4:",txn4.hash);
    
    const txn5 = await paperNFTContract.mintTokenImageBasic(WALLET_ADDRESS,"ipfs://QmcjpsTELRmFGhLYZHM3rYB7aG8wuEoXZxZvdP241WrU4T");
    console.log("tx5:",txn5.hash);
    
    const txn6 = await paperNFTContract.mintTokenBasic(WALLET_ADDRESS);
    console.log("tx6:",txn6.hash);

    console.log("tokenURI[1]:",await paperNFTContract.returnTokenURI(1));
    console.log("tokenURI[2]:",await paperNFTContract.returnTokenURI(2));
    console.log("tokenURI[3]:",await paperNFTContract.returnTokenURI(3));
    console.log("tokenURI[4]:",await paperNFTContract.returnTokenURI(4));
    console.log("tokenURI[5]:",await paperNFTContract.returnTokenURI(5));
    console.log("tokenURI[6]:",await paperNFTContract.returnTokenURI(6));


    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
