//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9; 

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "hardhat/console.sol";

// test 용 NFT 이다. 실전에 쓰지 않도록 한다.
contract PaperNFT is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds;

    // address s_contractAddress;

    // constructor(address _contractAddress) ERC721("Boom Paper NFT", "BPN") {
    //     s_contractAddress = _contractAddress;
    // }

    // owner 는 paper 생성자 
    constructor() ERC721("Boom Paper NFT", "BPN") {
    }

    function returnTokenURI(uint256 _tokenId) external view returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    /// tokenURI payload를 받아서 그냥 넣는다.
    /// TODO payable을 해야 할 듯?
    event mintTokenSuccess(uint256 tokenId);
    function mintToken(string memory tokenURI) public returns (uint256) {
        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        //setApprovalForAll(s_contractAddress, true);

        emit mintTokenSuccess(newItemId);
        return newItemId;
    }

    event mintTokenToSuccess(uint256 tokenId);
    function mintTokenTo(address _mintTo,string memory tokenURI) public returns (uint256) {
        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();
        _mint(_mintTo, newItemId);
        _setTokenURI(newItemId, tokenURI);
        //setApprovalForAll(s_contractAddress, true);

        emit mintTokenToSuccess(newItemId);
        return newItemId;
    }

    event mintTokenBySvgSuccess(uint256 tokenId);

    /// svgImage 를 받아서 포맷에 맞춰서 tokenURI 를 넣는다.
    function mintTokenBySvg(string memory svgImage) public returns (uint256) {

        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();

        _mint(msg.sender, newItemId);
        string memory tokenURI = getTokenURI(newItemId,svgImage);
        //console.log("tokenURI:",tokenURI);
        _setTokenURI(newItemId, tokenURI);
        // TODO 해야 하는가??? 
        //setApprovalForAll(s_contractAddress, true);
        emit mintTokenBySvgSuccess(newItemId);

        return newItemId;
    }

    event setTokenURIBySvgSuccess(uint256 _tokenId);
    // test function
    // dangerous function
    function setTokenURIBySvg(uint256 _tokenId,string memory svgImage) public returns (uint256) {

        string memory tokenURI = getTokenURI(_tokenId,svgImage);
        //console.log("tokenURI:",tokenURI);
        _setTokenURI(_tokenId, tokenURI);

        emit setTokenURIBySvgSuccess(_tokenId);

        return _tokenId;
    }

    event mintTokenBySvgToSuccess(address _mintTo,uint256 tokenId);

    function mintTokenBySvgTo(address _mintTo,string memory svgImage) public returns (uint256) {

        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();

        _mint(_mintTo, newItemId);

        string memory tokenURI = getTokenURI(newItemId,svgImage);
        //console.log("tokenURI:",tokenURI);
        _setTokenURI(newItemId, tokenURI);
        // TODO 해야 하는가??? 
        //setApprovalForAll(s_contractAddress, true);
        emit mintTokenBySvgToSuccess(_mintTo,newItemId);
        
        return newItemId;
    }

    // TODO public -> private
    /// itemId , svgImage 받아서, tokeURI 로 만드는 것
    function getTokenURI(uint256 itemId,string memory svgImage) public pure returns (string memory){
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Boom Paper #', itemId.toString(), '",',
                '"image_data": "', getPackedImage(svgImage), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    // TODO client 에서 해도 된다. 테스트를 위해 contract에 넣어보자.
    // TODO public -> private
    /// 순수하게 svgImage 를 받아서 base64 인코딩 하고, abi.encodePacked 하는 것
    function getPackedImage(string memory svgImage) public pure returns(string memory) {
        bytes memory svg = abi.encodePacked(svgImage); 
        // return string(
        //     abi.encodePacked(
        //         "data:image/svg+xml;base64,",
        //         Base64.encode(svg)
        //     )    
        // );
        string memory output = string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )    
        );
        //console.log("getPackedImage:",output);
        return output;
    }    

    event mintTokenBasicSuccess(address _mintTo,uint256 tokenId);

    // test function
    function mintTokenBasic(address _mintTo) public returns (uint256) {

        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();

        _mint(_mintTo, newItemId);
        _setTokenURI(newItemId, getTokenBasicURI(newItemId));

        emit mintTokenBasicSuccess(_mintTo,newItemId);
        
        return newItemId;
    }

    // test function
    function getTokenBasicURI(uint256 itemId) public pure returns (string memory){
        string[3] memory parts;
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        parts[1] = Strings.toString(itemId);

        parts[2] = '</text></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2]));

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Boom Paper  #', Strings.toString(itemId), '",',
            '"description": "A Boom Paper from BoomLabs",',
            '"image_data": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), 
            '"}'))));
        //console.log("getTokenBasicURI json:",json);
        
        string memory output2 = string(abi.encodePacked('data:application/json;base64,', json));

        //console.log("getTokenBasicURI output:",output2);

        return output2;

    }

    event mintTokenTextBasicSuccess(address _mintTo,uint256 tokenId);

    // test function
    function mintTokenTextBasic(address _mintTo) public returns (uint256) {

        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();

        _mint(_mintTo, newItemId);
        string memory tokenURI = getTokenTextBasicURI(newItemId);
        //console.log("mintTokenTextBasic tokenURI:",tokenURI);
        _setTokenURI(newItemId, tokenURI);

        emit mintTokenTextBasicSuccess(_mintTo,newItemId);
        
        return newItemId;
    }

    // test function
    function getTokenTextBasicURI(uint256 itemId) public pure returns (string memory){
     
        string memory json = string(abi.encodePacked(
            '{"name": "Boom Paper  #', Strings.toString(itemId), '",',
            '"description": "A Boom Paper from BoomLabs",',
            '"attributes": [ { "trait_type": "Type", "value": "Basic" } ,{ "trait_type": "Msg1", "value": "I Love You!" } ]',
            '}'));
        //console.log("getTokenTextBasicURI json:",json);

        string memory output = string(abi.encodePacked('data:application/json;base64,', 
            Base64.encode(bytes(json))));

        return output;

    }

    event mintTokenImageBasicSuccess(address _mintTo,uint256 tokenId);

    // test function
    function mintTokenImageBasic(address _mintTo,string memory _imageUrl) public returns (uint256) {

        s_tokenIds.increment();
        uint256 newItemId = s_tokenIds.current();

        _mint(_mintTo, newItemId);
        string memory tokenURI = getTokenImageBasicURI(newItemId,_imageUrl);
        //console.log("mintTokenImageBasic tokenURI:",tokenURI);
        _setTokenURI(newItemId, tokenURI);

        emit mintTokenImageBasicSuccess(_mintTo,newItemId);
        
        return newItemId;
    }

    // test function
    function getTokenImageBasicURI(uint256 itemId,string memory _imageUrl) public pure returns (string memory){
     
        string memory json = string(abi.encodePacked(
            '{"name": "Boom Paper  #', Strings.toString(itemId), '",',
            '"description": "A Boom Paper from BoomLabs",',
            '"attributes": [ { "trait_type": "Type", "value": "Basic" } ,{ "trait_type": "Msg1", "value": "I Love You!" } ],',
            '"image" :', '"' , _imageUrl , '"', 
            '}'));
        //console.log("getTokenImageBasicURI json:",json);

        string memory output = string(abi.encodePacked('data:application/json;base64,', 
            Base64.encode(bytes(json))));

        return output;

    }

}
