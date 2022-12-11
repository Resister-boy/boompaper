import { Contract, ethers, providers } from 'ethers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    AppContext,
    getPaperManagerContract,
    getPaperContract,
} from "./index"
import { connect } from "./walletConnection";

interface Props {
    children: JSX.Element | JSX.Element[];
}

type InitialStateType = {
  web3Provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined;
  account: string;
  signer: providers.JsonRpcSigner | undefined; //ethers.Signer;
  
  paperManagerContract: Contract;
  paperContract: Contract;

  paperId : number;
  setPaperId : (paperId : number) => void;
  
  paperNFTId : number;
  setPaperNFTId : (paperNFTId : number) => void;
};

export const AppProvider = ({ children }: Props) => {

    const [isConnected, setIsConnected] = useState(false);
    const [paperManagerContract, setPaperManagerContract] = useState<Contract | null>(null);
    const [paperContract, setPaperContract] = useState<Contract | null>(null);
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined>(undefined);
    const [signerAddr, setSignerAddr] = useState<string | undefined >(undefined);
    const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>(undefined);
    const [paperId, setPaperId] = useState<number >(0);
    const [paperNFTId, setPaperNFTId] = useState<number >(0);

    const router = useRouter();

    const providerEvents = () => {
        window.ethereum.on("accountsChanged", async () => {
            setIsConnected(false);
            setWeb3Provider(undefined);
            setPaperManagerContract(null);
            setPaperContract(null);
            setSignerAddr(undefined);
            setSigner(undefined);
            setPaperId(0);
            setPaperNFTId(0);

            router.push("/");
        });
    };



    const connectWallet = async () => {
        try {
          if (
            typeof window != "undefined" &&
            typeof window.ethereum != "undefined" &&
            window.ethereum.isMetaMask
          ) {
            const web3Provider = await connect();
            if (!web3Provider) {
              toast.error("An error was ocurred when try to connect your wallet");
              return;
            }
            const { chainId } = await web3Provider.getNetwork();
            if (chainId !== 31337 && chainId !== 80001) {
              window.alert(
                "Change your network to Mumbai Testnet or Local HardHat"
              );
              throw new Error(
                "Change your network to Mumbai Testnet or Local HardHat"
              );
            }
            const signer = web3Provider.getSigner();
            const accounts = await signer.provider.listAccounts();
            const paperManagerContract = await getPaperManagerContract(web3Provider, signer);
            const paperContract = await getPaperContract(web3Provider, signer);
            setInitialState({
              web3Provider,
              signer : signer,
              //signerAddr : accounts[0],
              account: accounts[0],

              paperManagerContract,
              paperContract,

              paperId,
              setPaperId,

              paperNFTId,
              setPaperNFTId,
            });
          } else {
            toast.info("Please install metamask!");
          }
        } catch (error) {
          console.error(" error", error);
          toast.error("An error was ocurred when try to connect your wallet");
        }
      };

      const setInitialState = async ({
        paperManagerContract,
        paperContract,
        account,
        signer,
        web3Provider,
        paperId,
        paperNFTId,
      }: InitialStateType) => {
        setWeb3Provider(web3Provider);
        setSignerAddr(account);
        setSigner(signer);
        setIsConnected(true);
        setPaperManagerContract(paperManagerContract);
        setPaperContract(paperContract);
        setPaperId(paperId);
        setPaperNFTId(paperNFTId);
        providerEvents();
      };  

  return (
    <AppContext.Provider
      value={{
        isConnected,
        web3Provider,
        signerAddr,
        signer,

        paperManagerContract,
        paperContract,
   
        paperId,
        setPaperId,

        paperNFTId,
        setPaperNFTId,
        
        connectWallet,

      }}
    >
      {children}
    </AppContext.Provider>
  );    
};
