export interface IPaperItem {
    itemId : string;
    nftContract : string;
    title : string;
    ownerName : string;
    owner : string;
    createAt : number;
    closed : boolean;
}

export interface IPaperToken  {
    tokenId : string;
    tokenURI : string;
}

export interface IPaperNFT  {
    image : string;
    name : string;
    description : string;
}
