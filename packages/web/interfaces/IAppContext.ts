import { Contract , ethers, providers } from 'ethers';

export interface IAppContext {
    // 월릿 연결 상태 여부   
    isConnected : boolean;
    // web3 provider
    web3Provider : ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined;
    // 월릿 서명자
    signerAddr : string | undefined;
    signer : providers.JsonRpcSigner | undefined;
    // 대표 컨트랙트
    paperManagerContract : Contract | null;
    // 현재 보고 있는 페이퍼 컨트랙트 ( 없으면 null ) , 선택하거나 생성하면 바뀜
    paperContract : Contract | null;

    // 현재 보고 있는 페이퍼 아이디
    paperId : number;
    setPaperId : (paperId : number) => void;

    // 현재 보고 있는 페이퍼 NFT 아이디 
    paperNFTId : number;
    setPaperNFTId : (paperNFTId : number) => void;

    connectWallet : () => void;

}