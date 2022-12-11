//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9; 

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "hardhat/console.sol";

// PaperManager 가 생성하는 NFT 이다.
// 그리고 minting 하는 것은 Comment Message 이다.
contract Paper is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // TODO 초대 address 
    //address[] inviteAddresses;
    // TODO 허용 address 
    //address[] allowAddresses;
    // TODO 블럭 address
    //address[] denyAddresses;

    // address s_contractAddress;

    // owner 는 paper 생성자 
    constructor(string memory title,string memory name) ERC721(title, name) {
    }

    // tokenURI 확인하기 
    function returnTokenURI(uint256 _tokenId) external view returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    struct PaperNFTItem {
        uint256 tokenId;
        string tokenURI;
    }

    // Paper에 속한 모든 NFT 를 가져온다.
    function getAllTokenURI() public view returns (PaperNFTItem[] memory) {
        uint256 itemsCount = _tokenIds.current();
        PaperNFTItem[] memory items = new PaperNFTItem[](itemsCount);
        for (uint256 i = 0; i < itemsCount; i++) {
            PaperNFTItem storage item;
            item.tokenId=i+1;
            item.tokenURI=super.tokenURI(i+1);
            items[i] = item;
        }
        return items;
    }


    /// tokenURI payload를 받아서 그냥 넣는다.
    /// TODO payable을 해야 할 듯?
    event EvMintTokenSuccess(uint256 tokenId);
    function mintToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        //setApprovalForAll(s_contractAddress, true);

        emit EvMintTokenSuccess(newItemId);
        return newItemId;
    }

    event EvMintTokenToSuccess(uint256 tokenId);

    function mintTokenTo(address _mintTo,string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_mintTo, newItemId);
        _setTokenURI(newItemId, tokenURI);
        //setApprovalForAll(s_contractAddress, true);

        emit EvMintTokenToSuccess(newItemId);
        return newItemId;
    }



