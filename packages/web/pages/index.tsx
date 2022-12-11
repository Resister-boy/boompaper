import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useContext } from 'react'
import { AppContext } from '../context'
import ConnectModal from '../components/common/modal/ConnectModal'

const Home : NextPage = () => {

  const { isConnected, connectWallet } = useContext(AppContext);
  const [ isModal, setIsModal ] = useState<number>(0)

  const changeModal = () => {
    if(!isConnected && isModal === 0) {
      setIsModal(1)
      console.log(isModal)
    }  else if(!isConnected && isModal === 1) {
      setIsModal(0)
      console.log(isModal)
    } else if(isConnected) {
      setIsModal(2)
    }
  }

  return (
    <main>
      <Head>
        <title>Boom Paper</title>
        <meta name="description" content="Boom Paper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`h-screen bg-[url('/designAssets/home-background.svg')] relative overflow-hidden`}>
        <div className="absolute top-72 left-1/2 transform -translate-x-1/2 z-40 text-center">
          <div className='text-3xl font-semibold text-[#5760BC]'>{`나만의 롤링페이퍼를 NFT로 만들어보세요`}</div>
          <div className='mt-4 text-[#5760BC]'>{`Create, Share and Mint. Let's make your own rolling paper NFT`}</div>
          <div className='mt-12'>
            {!isConnected
              ? ( 
                <button type="button" onClick={changeModal} className='px-10 py-2 border-2 rounded-3xl bg-[#5760BC] text-[#fff] font-medium hover:border-[#5760BC] hover:bg-[#CDD1F2] hover:text-[#5760BC] hover:font-semibold'>Go Create</button>
              ): (
                <div>
                  <Link href="/paper/list">
                    <a className='px-10 py-3 border-2 rounded-3xl bg-[#5760BC] text-[#fff] font-medium hover:border-[#5760BC] hover:bg-[#CDD1F2] hover:text-[#5760BC] hover:font-semibold'>Go Create</a>
                  </Link>
                </div>
              )
            }
          </div>
        </div>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 ">
          <Image 
            src="/designAssets/home-moon.svg"
            alt="home-moon"
            width={170}
            height={170}
            />
        </div>
        <div className="absolute bottom-0 left-0">
          <Image 
            src="/designAssets/home-cloud.svg"
            alt="home-cloud"
            width={1920}
            height={375}
            />
        </div>
        <div className="absolute top-44 -left-4">
          <Image 
            src="/designAssets/home-leaf-1.svg"
            alt="home-leaf"
            width={188}
            height={193}
            />
        </div>
        <div className="absolute top-36 left-52">
          <Image 
              src="/designAssets/home-leaf-2.svg"
              alt="home-leaf"
              width={100}
              height={100}
              />
        </div>
        <div className="absolute top-96 left-96">
          <Image 
              src="/designAssets/home-leaf-3.svg"
              alt="home-leaf"
              width={74}
              height={151}
              />
        </div>
        <div className="absolute top-72 right-52">
          <Image 
              src="/designAssets/home-leaf-4.svg"
              alt="home-leaf"
              width={89}
              height={182}
              />
        </div>
        <div className="absolute top-20 -right-8">
          <Image 
              src="/designAssets/home-leaf-5.svg"
              alt="home-leaf"
              width={251}
              height={212}
              />
        </div>
        <div className="absolute top-40 left-1/3">
          <Image 
              src="/designAssets/home-bird-1.svg"
              alt="home-bird"
              width={150}
              height={73}
              />
        </div>
        <div className="absolute top-52 right-1/3 transform -translate-x-2/3">
          <Image 
              src="/designAssets/home-bird-2.svg"
              alt="home-bird"
              width={121}
              height={72}
              />
        </div>
        <div className="absolute top-52 right-1/4">
          <Image 
              src="/designAssets/home-bird-3.svg"
              alt="home-bird"
              width={116}
              height={81}
              />
        </div>
      </section>
      <ConnectModal 
        isConnected={isConnected}
        connectWallet={connectWallet}
        isModal={isModal}
        changeModal={changeModal}
      />
    </main>
  )
}

export default Home
