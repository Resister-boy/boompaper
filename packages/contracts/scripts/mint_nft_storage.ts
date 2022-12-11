import { ethers , network} from "hardhat";

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from 'mime'

// The 'fs' builtin module on Node.js provides access to the file system
import fs from 'fs'

// The 'path' module provides helpers for manipulating filesystem paths
import path from 'path'

// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// SECURITY .env 에 세팅되어야 함. git에 올라가면 안됨!
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

// https://nft.storage/docs/

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 async function fileFromPath(filePath :string) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
 async function storeNFT(imagePath :string , name :string , description :string) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}



// hardhat 이 abi json 파일을 만들어주는구나! 
// artifacts 라는 폴더에 저장되어 있다!

// test mint PaperNFT
async function main() {
    const paperNftContractFactory = await ethers.getContractFactory("PaperNFT");

    const paperNFTContract = paperNftContractFactory.attach(CONTRACT_ADDRESS);

    const provider = new ethers.providers.StaticJsonRpcProvider();

    const ownerSigningWallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
    
    const signer = ownerSigningWallet.connect(provider);

    // https://eips.ethereum.org/EIPS/eip-1155#metadata 로 맞춰서?
    // https://nft.storage/docs/how-to/mint-custom-metadata/

    // image file(배경 카드 image)를 읽어서 ipfs 에 올린다.
    // meta data 를 꾸며서 ipfs 에 올린다.
    // meta data uri 를 assign 한다?
    
    const txn5 = await paperNFTContract.mintTokenTo(WALLET_ADDRESS,"ipfs://QmcjpsTELRmFGhLYZHM3rYB7aG8wuEoXZxZvdP241WrU4T");
    console.log("tx5:",txn5.hash);
    
    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
