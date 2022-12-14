//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9; 

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// TODO ERC721 대신에 ERC721URIStorage 를 쓰는 이유는 _setTokenURI 를 쓰기 위함
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "hardhat/console.sol";

// PaperManager 가 생성하는 NFT 이다.
// 그리고 minting 하는 것은 Comment Message 이다.
contract Paper is ERC721URIStorage {
    // using Strings for uint256 를 왜 쓰는가?
    // https://forum.openzeppelin.com/t/what-does-this-mean-using-strings-for-uint256-in-erc721-contracts/7964
    // This is to say, an uint256 variable can call up functions in the Strings library. 
    // One example can be, value.toString(). 
    // An uint256 can be easily converted into a string. How convenient.
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // 아래 3개는 하려고 했지만 구현하지 않음.
    // TODO 초대 address 
    //address[] inviteAddresses;
    // TODO 허용 address 
    //address[] allowAddresses;
    // TODO 블럭 address
    //address[] denyAddresses;

    // owner 는 paper 생성자 
    // title,name 을 정해줘야 함.
    constructor(string memory title,string memory name) ERC721(title, name) {
    }

    // tokenURI 확인하기 
    function returnTokenURI(uint256 _tokenId) external view returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    function returnTotalItems() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    // 
    struct PaperNFTItem {
        uint256 tokenId;
        string tokenURI;
    }

    /// Paper에 속한 모든 NFT 를 가져온다.
    // 모두 가져오는 좀 무식한 API 임.
    function getAllTokenURI() public view returns (PaperNFTItem[] memory) {
        uint256 itemsCount = _tokenIds.current();
        PaperNFTItem[] memory items = new PaperNFTItem[](itemsCount);
        for (uint256 i = 0; i < itemsCount; i++) {
            PaperNFTItem memory item;
            item.tokenId=i+1;
            item.tokenURI=super.tokenURI(i+1);
            items[i] = item;
        }
        return items;
    }

    /// tokenURI payload를 받아서 그냥 넣는다.
    // TODO 민트하는데 돈 들게 하려면, payable을 해야 할 듯? 
    event EvMintTokenSuccess(uint256 tokenId);
    function mintToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit EvMintTokenSuccess(newItemId);
        return newItemId;
    }

    event EvMintTokenToSuccess(uint256 tokenId);

    function mintTokenTo(address _mintTo,string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_mintTo, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit EvMintTokenToSuccess(newItemId);
        return newItemId;
    }

}

