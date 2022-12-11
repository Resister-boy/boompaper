
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { Contract, ContractFactory } from "ethers";
//import type { PaperNFT } from "../types/PaperNFT";
import { NFTStorage } from 'nft.storage'
 
const NFTStorageAPIKey = process.env.NFT_STORAGE_KEY;


describe("Paper", function () {

  let NFT: ContractFactory;
  let nft: Contract;
  let deployer: SignerWithAddress;
  let creator1: SignerWithAddress;
  let creator2: SignerWithAddress;
  let creator3: SignerWithAddress;
  let creator4: SignerWithAddress;
  let mintTo1: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let nftContractAddress: string;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    creator1 = accounts[1];
    creator2 = accounts[2];
    creator3 = accounts[3];
    creator4 = accounts[4];
    mintTo1 = accounts[4];

    NFT = await ethers.getContractFactory("Paper");
    nft = await NFT.deploy("생일 축하","hbp");
    await nft.deployed();
    nftContractAddress = nft.address;
    console.log("nftContractAddress :", nftContractAddress);
    console.log("deployer :", deployer.address);
    console.log("creator1 :", creator1.address);
    console.log("creator2 :", creator2.address);
    console.log("creator3 :", creator3.address);
    console.log("creator4 :", creator4.address);
    console.log("mintTo1 :", mintTo1.address);
  });

  describe("constructor", function () {
    it("intitiallizes the nft  correctly", async () => {
      //const owner = await nft.getOwner();
      //assert.equal(owner, deployer.address);
    });
  });



  describe("create NFT Item", function () {
    it("nft should be created", async () => {

    const payload = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 500 500">
    <style>.b { fill: white; font-family: serif; font-size: 14px; }</style>
    <rect width="100%" height="100%" fill="black" />
    <text x="10%" y="10%" class="b">You are my Best Friend!</text>
    <text x="10%" y="20%" class="b">You are my only Love!</text>
  </svg>`;
 
    await expect(nft.mintToken(payload)).to.emit(nft, "EvMintTokenSuccess")
 
    console.log("tokenURI[1]:",await nft.returnTokenURI(1));

    });

  });
  describe("create NFT Item to", function () {
    it("nft should be created to", async () => {

      const payload = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 500 500">
      <style>.b { fill: white; font-family: serif; font-size: 14px; }</style>
      <rect width="100%" height="100%" fill="black" />
      <text x="50%" y="50%" class="b">You are my only Love!</text>
    </svg>`;
   
      
      await expect(nft.mintTokenTo(creator1.address,payload))
          .to.emit(nft, "EvMintTokenToSuccess")  
   
      console.log("tokenURI[1]:",await nft.returnTokenURI(1));
      
    
    });

    it("nft should be created using ipfs json", async () => {

        // example ipfs tokenURI
      const tokenURI = "ipfs://bafyreig52nfveqowdauq65o2d2mvg6apnlkrftx2oocb6st57ww46xk3hu/metadata.json";

      await expect(nft.mintTokenTo(creator1.address,tokenURI))
          .to.emit(nft, "EvMintTokenToSuccess")  
   
      console.log("tokenURI[1]:",await nft.returnTokenURI(1));
      
    });

  });


  
  describe("create NFT using ipfs ", function () {
    it("NFTStorage should be working", async () => {

      async function getExampleImage() {
        const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
        const r = await fetch(imageOriginUrl)
        if (!r.ok) {
          throw new Error(`error fetching image: [${r.statusText}]: ${r.status}`)
        }
        return r.blob()
      }
      const image = await getExampleImage();
      const nft  = {
        image, // use image Blob as `image` field
        name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
        description: "The metaverse is here. Where is it all being stored?",
        properties: {
          type: "blog-post",
          origins: {
            http: "https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/",
            ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"
          },
          authors: [{ name: "David Choi" }],
          content: {
            "text/markdown": "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
          }
        }
      };

      const client = new NFTStorage({ token: NFTStorageAPIKey });
      const metadata = await client.store(nft);

      console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
    });

    it("NFTStorage should be working", async () => {

      const payload :string = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 500 500">
      <style>.b { fill: white; font-family: serif; font-size: 14px; }</style>
      <rect width="100%" height="100%" fill="black" />
      <text x="50%" y="50%" class="b">REPLACE</text>
    </svg>`;

      const base64SVG: string = btoa(payload);
      const imgSrc: string = `data:image/svg+xml;base64,${base64SVG}`;

      console.log("img:",imgSrc);

      // https://javascript.info/blob
      const imgBlob = new Blob([payload], { type: "image/svg+xml" });

      const client = new NFTStorage({ token: NFTStorageAPIKey })
      const metadata = await client.store({
          name: 'Your lovely',
          description: 'I love you so much!',
          image: imgBlob,
      });
    
      console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)

    });
    it("nft should be created to", async () => {
    
      const payload = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 500 500">
      <style>.b { fill: white; font-family: serif; font-size: 14px; }</style>
      <rect width="100%" height="100%" fill="black" />
      <text x="50%" y="50%" class="b">REPLACE</text>
    </svg>`;

      // TODO parse xml or replace the 'REPLACE' text with a new Message
      var re = /REPLACE/gi; 
      //var str = "Apples are round, and apples are juicy.";
      var newstr = payload.replace(re, "I love you so much!"); 

      console.log("newstr:",newstr);

      // https://javascript.info/blob
      const imgBlob = new Blob([newstr], { type: "image/svg+xml" });

      const client = new NFTStorage({ token: NFTStorageAPIKey })
      const metadata = await client.store({
          name: 'Your lovely',
          description: 'I love you so much!',
          image: imgBlob,
      });
    
      console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)

      await expect(nft.mintTokenTo(creator1.address,metadata.url))
        .to.emit(nft, "EvMintTokenToSuccess")  

      const totalItems = await nft.returnTotalItems();
      console.log("totalItems:",totalItems);

      console.log("tokenURI[1]:",await nft.returnTokenURI(1));

      console.log("tokenURI[totalItems]:",await nft.returnTokenURI(totalItems));

    });
  });
  
});


