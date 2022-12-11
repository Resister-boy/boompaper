import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import type { PaperManager } from "../typechain/contracts/PaperManager";
import type { Paper } from "../typechain/contracts/Paper";

describe("PaperManager", function () {

  let PaperManagerFactory: ContractFactory;
  let paperManager: Contract;
  let deployer: SignerWithAddress;
  let creator1: SignerWithAddress;
  let creator2: SignerWithAddress;
  let creator3: SignerWithAddress;
  let creator4: SignerWithAddress;
  let mintTo1: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let paperManagerContractAddress: string;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    creator1 = accounts[1];
    creator2 = accounts[2];
    creator3 = accounts[3];
    creator4 = accounts[4];
    mintTo1 = accounts[4];

    PaperManagerFactory = await ethers.getContractFactory("PaperManager");
    paperManager = await PaperManagerFactory.deploy();
    await paperManager.deployed();
    paperManagerContractAddress = paperManager.address;
    console.log("paperManagerContractAddress :", paperManagerContractAddress);
    console.log("deployer :", deployer.address);
    console.log("creator1 :", creator1.address);
    console.log("creator2 :", creator2.address);
    console.log("creator3 :", creator3.address);
    console.log("creator4 :", creator4.address);
    console.log("mintTo1 :", mintTo1.address);
  });

  describe("PaperManager constructor", function () {
    it("intitiallizes the paperManager  correctly", async () => {
      const owner = await paperManager.getOwner();
      console.log("owner :", owner);
      console.log("deployer.address :", deployer.address);
      assert.equal(owner, deployer.address);
    });
  });

  describe("create PaperManagerFactory Item", function () {
    it("paperManager should be created, got and closed", async () => {

      const txn1 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
      console.log("txn1 :", txn1);
      //console.log("txn1 :", txn1.hash);
      
      const receipt1 = await txn1.wait();

      for (const event of receipt1.events) {
        console.log(`Event ${event.event} with args ${event.args}`);
      }

      //expect(txn1).to.emit(paperManager, "EvPaperItem");

      // receipt1.on("EvPaperItem", (r1 : PaperManager.PaperItemStructOutput )  => {
      //   console.log("r1 :", r1);
      // });

      //await expect(paperManager.createPaperItem("happy birthday2!","hbp2"))
      //   .to.emit(paperManager, "EvPaperItem")

      const txn2 =await paperManager.getPaperItemById(1);
      console.log("txn2 :", txn2);
      expect(txn2.closed).to.be.false;
      
      const txn3 = await paperManager.closePaper(txn2.nftContract,1);
      console.log("txn3 :", txn3);

      const txn4 =await paperManager.getPaperItemById(1);
      console.log("txn4 :", txn4);
      expect(txn4.closed).to.be.true;

      const txn5 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
        // .on("transactionHash", (hash) => {
        //   console.log("hash :", hash);
        // }).on("receipt", (receipt) => {
        //   console.log("receipt :", receipt);
        // }).on("confirmation", (confirmationNumber, receipt) => {
        //   console.log("confirmationNumber :", confirmationNumber);
        //   console.log("receipt :", receipt);
        // }).on("error", (error) => {
        //   console.log("error :", error);
        // .on("EvPaperItem"), (r1 : PaperManager.PaperItemStructOutput )  => {
        //   console.log("r1 :", r1);
        // });

      console.log("txn5 :", txn5);



      // await expect(paperManager.closePaper(paperManager,1))
      //   .to.emit(paperManager, "EvPaperItem")

    });

    it("paperManager should be created and listed", async () => {

      const txn1_1 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
      console.log("txn1_1 :", txn1_1);

      const txn1_2 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
      console.log("txn1_2 :", txn1_2);
      
      const txn1_3 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
      console.log("txn1_3 :", txn1_3);

      const txn3 = await paperManager.getPaperItems();
      console.log("txn3 :", txn3);
      
      const txn4 = await paperManager.getPaperItemsByOwner();
      console.log("txn4 :", txn4);

      const txn5 = await paperManager.getTotalPaperItems();
      console.log("txn5 :", txn5);

      // TODO big number 어떻게 넘기나?
      //const txn6 = await paperManager.countOwnersPaperItems({value:txn5.value});
      //console.log("txn6 :", txn6);   

      const txn6 = await paperManager.fetchPaperItems(2,2,0);
      console.log("txn6 :", txn6);

      // TODO timestamp 어떻게 보내나?
      const txn7 = await paperManager.fetchPaperItemsByTime(0,100);
      console.log("txn7 :", txn7);
    });

    it("a paper should be accessed.", async () => {

      const txn1 = await paperManager.createPaperItem("Happy Holidays!","hbp","Wondong");
      console.log("txn1 :", txn1);
      // await expect(paperManager.createPaperItem("happy birthday2!","hbp2","Wondong");
      //   .to.emit(paperManager, "EvPaperItem")

      const txn2 =  await paperManager.getPaperItemById(1);
      console.log("txn2 :", txn2);
      expect(txn2.closed).to.be.false;

      //txn2.nftContract;
      console.log("txn2.nftContract :", txn2.nftContract);
      const paperFactory = await ethers.getContractFactory("Paper");

      const paper1 = paperFactory.attach( txn2.nftContract );
      //console.log("paper1 :", paper1);

      const tokenURI = "ipfs://bafyreig52nfveqowdauq65o2d2mvg6apnlkrftx2oocb6st57ww46xk3hu/metadata.json";

      await expect(paper1.mintTokenTo(creator1.address,tokenURI))
          .to.emit(paper1, "EvMintTokenToSuccess")  
   
      console.log("tokenURI[1]:",await paper1.returnTokenURI(1));

      await expect(paper1.mintTokenTo(creator2.address,tokenURI))
      .to.emit(paper1, "EvMintTokenToSuccess")  

      console.log("tokenURI[2]:",await paper1.returnTokenURI(2));

      const txn3= await paper1.getAllTokenURI();
      console.log("txn3:",txn3);

      const totalItems = await paper1.returnTotalItems();
      console.log("totalItems:",totalItems);

      console.log("tokenURI[totalItems]:",await paper1.returnTokenURI(totalItems));


    });
    
  });


 


});

