import { createContext } from 'react';
import { IAppContext } from "../interfaces";


// App 전체에서 저장하는 컨텍스트
// 너무 많아지면, 코드가 너무 복잡해진다.
// 꼭 필요한 것만 넣자.
export const contextDefaultValues: IAppContext = {
    isConnected : false,
    web3Provider: undefined,
    signerAddr : undefined,
    signer : undefined,
    paperManagerContract : null,
    paperContract : null,
    paperId : 0,
    setPaperId : (paperId : number) => {
        return paperId
    },
    paperNFTId : 0,
    setPaperNFTId : (paperNFTId : number) => {
        return paperNFTId
    },
    connectWallet() {
        return ;
    }
};

export const AppContext = 
    createContext<IAppContext>(contextDefaultValues)

