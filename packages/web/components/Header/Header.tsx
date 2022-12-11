import { NextPage } from 'next'
import { useContext } from 'react'
import { AppContext } from '../../context'
import { Brand } from './Brand'
import Link from 'next/link'

export const Header: NextPage = () => {

    const { isConnected, connectWallet } = useContext(AppContext);

    return (
        <header className="w-full bg-[#CDD1F2] fixed z-30   ">
            <div className="container w-4/5 h-auto mx-auto py-1 flex justify-between flex-col sm:flex-row items-center">
                <Brand />
                <nav className="w-auto flex flex-wrap justify-end">
                    <Link href="/mypage">
                        <a className="mx-4 font-base px-3 py-1 rounded-xl hover:bg-[#B6BDF1] duration-200">My Page</a>
                    </Link>
                    <Link href="/about">
                        <a className="mx-4 font-base px-3 py-1 rounded-xl hover:bg-[#B6BDF1] duration-200">About</a>
                    </Link>
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

