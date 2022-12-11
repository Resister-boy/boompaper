import React, { useEffect, useState } from 'react'
import ConnectButton from '../components/common/ConnectButton';
import { useAccount } from 'wagmi'

const Test = () => {

  const { address } = useAccount();
  const [ userAddress, getUserAddress ] = useState("");
  useEffect(() => {
    if (address) getUserAddress(address);
  }, [address])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <ConnectButton 
      />
      <div>
        {userAddress}
      </div>
    </div>
  )
}

export default Test