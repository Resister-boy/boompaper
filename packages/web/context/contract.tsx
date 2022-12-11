import { Contract, ethers, providers } from "ethers";
import { PAPER_MANAGER_CONTRACT, PAPER_CONTRACT } from "../utils";

export const getPaperManagerContract = async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined,
  signer?: providers.JsonRpcSigner
): Promise<Contract> => {
  if ( !provider ) {
    return new ethers.Contract("","");
  }
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  const contractAddress = PAPER_MANAGER_CONTRACT[key].address;
  const contractAbi = PAPER_MANAGER_CONTRACT[key].abi;
  const signerOrProvider:
    | providers.Web3Provider
    | providers.JsonRpcProvider
    | providers.JsonRpcSigner = !signer ? provider : signer;
  const tempContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signerOrProvider
  );
  return tempContract;
};

export const getPaperContract = async (
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined,
  signer?: providers.JsonRpcSigner
): Promise<Contract> => {
  if ( !provider ) {
    return new ethers.Contract("","");
  }
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  const nftAddress = PAPER_CONTRACT[key].address;
  const nftAbi = PAPER_CONTRACT[key].abi;
  const signerOrProvider:
    | providers.Web3Provider
    | providers.JsonRpcProvider
    | providers.JsonRpcSigner = !signer ? provider : signer;
  const tempContract = new ethers.Contract(nftAddress, nftAbi, signerOrProvider);
  return tempContract;
};

export const getPaperContractByAddress = async (
  contractAddress: string,
  provider: providers.Web3Provider | providers.JsonRpcProvider | undefined,
  signer?: providers.JsonRpcSigner,
): Promise<Contract> => {
  if ( !provider ) {
    return new ethers.Contract("","");
  }
  console.log("contractAddress in getPaperContractByAddress:",contractAddress);
  const { chainId } = await provider.getNetwork();
  const key = chainId.toString();
  //const nftAddress = PAPER_CONTRACT[key].address;
  const nftAbi = PAPER_CONTRACT[key].abi;
  const signerOrProvider:
    | providers.Web3Provider
    | providers.JsonRpcProvider
    | providers.JsonRpcSigner = !signer ? provider : signer;
  const tempContract = new ethers.Contract(contractAddress, nftAbi, signerOrProvider);
  return tempContract;
};

//https://matic-testnet-archive-rpc.bwarelabs.com
