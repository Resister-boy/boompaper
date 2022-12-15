import { NextPage } from 'next'
import { useContext } from 'react'
import { AppContext } from '../../context'
import { Brand } from './Brand'
import { CommonButton } from '../common/button/index'

export const Header: NextPage = () => {

    const { isConnected, connectWallet } = useContext(AppContext);

    return (
        <header className="w-full bg-[#CDD1F2] fixed z-30   ">
            <div className="container w-4/5 h-auto mx-auto py-1 flex justify-between flex-col sm:flex-row items-center">
                <Brand />
                <nav className="w-auto flex flex-wrap justify-end">
                    <CommonButton path="/mypage" title="My page" />
                    <CommonButton path="/about" title="About us" />
                    <button onClick={connectWallet} className='bg-[#fff] border-2 border-[#fff] rounded-2xl px-3 py-1 hover:drop-shadow-xl duration-200'>
                        {isConnected 
                         ? <span>Connected</span>
                         : <span>Connect Wallet</span>
                        }
                    </button>
                </nav>
            </div>
        </header>
    )
}

