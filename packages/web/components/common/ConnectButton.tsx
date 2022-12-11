import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const connectButton = () => {
  return (
    <ConnectButton 
      accountStatus="address"
    />
  )
}

export default connectButton