
* src 폴더에 있던 것을 contracts 로 옮겨옴. artifacts 가 생성되지 않았는데, 이렇게 하니 생성된다 ㅎ

# About PaperNFT

* NFT 는 사람들이 갖고 싶고 간직하고 싶어야 한다.
* 지인들의 안부 인사, 감사 인사, 긍정 평가를 담아 평생 소중히 간직하고 싶은 추억을 소장하는 것.

# About Meta Data

* 메시지를 담을 수 있어야 한다.
* opensea에서 잘 보이는게 좋겠다.
* blockchain에 담고 프리즈후에는 수정할 수 없어야하겠다.

# ipfs 를 쓸 것인가 쓰지 않을 것인가?

* image 의 여부에 따라서 달라질 것.

## Common Meta Data

* ref : https://docs.opensea.io/docs/metadata-standards

* description :
* external_link :
* traits
* attributes :
* image :
* image_data :
* background_color

### essential field

* name :

### 안 써도 되는 field

* animation_url :
* youtube_url :


## Meta Data Model #1

* image_data : text 를 SVG Image 에 embed

## Open Sea Integration

### debugging

* https://docs.opensea.io/docs/4-debugging-your-metadata

### contract level meta data
* https://docs.opensea.io/docs/contract-level-metadata

* https://eips.ethereum.org/EIPS/eip-1155#metadata

### Freezing Metadata

* event PermanentURI(string _value, uint256 indexed _id);

## nft storage

* https://nft.storage/

* https://docs.opensea.io/docs/part-3-adding-metadata-and-payments-to-your-contract

# PaperNFT.sol

## mintToken

## mintTokenBySvg

## mintTokenBySvgTo

## mintTokenBasic

## mintTokenTextBasic

## mintTokenImageBasic



