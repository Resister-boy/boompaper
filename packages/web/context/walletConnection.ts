import { providers } from "ethers";
import Web3Modal from "web3modal";
//import WalletConnectProvider from "@walletconnect/web3-provider";

export const connect = async (): Promise<
  providers.Web3Provider | undefined
> => {
  try {
    // const providerOptionsWalletConnect = {
    //   walletconnect: {
    //     package : WalletConnectProvider,
    //     options : {
    //       infuraId : "9086404275634c2e8853cbac12561891",
    //     }
    //   }
    // };

    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {}, //providerOptionsWalletConnect, //{},
      theme: "dark",
    });
    const web3ModalInstance = await web3Modal.connect();
    const web3ModalProvider = new providers.Web3Provider(web3ModalInstance);
    if (web3ModalProvider) {
      console.log("Wallet connection: ", web3ModalProvider);
      return web3ModalProvider;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Wallet conn: ", error);
    return undefined;
  }
};
