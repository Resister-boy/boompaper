export interface LoadingState {
  isLoading: boolean;
}

export interface ConnectState {
  isConnected: boolean;
  connectWallet: () => void;
  isModal: number;
  changeModal: () => void;
}

export interface PaperState {
  paperOwnerName: string | undefined;
  nftAddress: string;
  totalNftItems: number;
  transactionHash: string;
}

export interface Paper {
  paperContract: string
}