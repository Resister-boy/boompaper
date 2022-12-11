import type { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '../../components/Footer/Footer';
import React, { useEffect, useState , useContext} from 'react'
import { AppContext, IPaperItem } from "../../context";
import Loading from '../../components/common/Loading';
import ConnectModal from '../../components/common/modal/ConnectModal';

const ListPapers : NextPage = () => {

  const [ isLoading, setIsLoading] = useState(false);
  const [ papers, setPapers ] = useState([])
  const [ isModal, setIsModal ] = useState<number>(0)
  const { isConnected, connectWallet } = useContext(AppContext);

  const changeMadal = () => {
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


    /*
    isConnected : false,
    web3Provider: undefined,
    signer : undefined,
    paperManagerContract : null,
    paperContract : null,
    connectWallet() {
        return;
    },
  */
  const { paperManagerContract } = useContext(AppContext);

  useEffect(() => {
    changeMadal()
    if ( !isConnected ) return;
    fetchPaperList();
  }, [isConnected])

  const fetchPaperList = async() => {
    setIsLoading(true)
    try {
      if(!paperManagerContract) return;
      console.log('paperManagerContract', paperManagerContract)
      const response = await paperManagerContract.getPaperItems();
      setPapers(response)
      
      console.log(response)
      console.log('papers', papers)
      setIsLoading(false)
    } catch(error) {
      console.log(error)
    }
  }

  return (
          <main>
            <div className='mt-44 h-auto relative overflow-hidden'>
              <div className='w-4/5 mx-auto mb-60'>
                  <div className='flex justify-between items-center'>
                      <div className='relative w-auto text-3xl font-semibold'>
                          롤링 페이퍼 컬렉션 리스트
                          <div className='absolute top-10 left-1 text-base text-[#333]'>List of All Papers</div>
                      </div>
                      <Link href="/paper/create">
                        <a className='px-8 py-3 rounded-xl border-2 bg-[#5760BC] text-[#fff] font-medium hover:border-[#5760BC] hover:text-[#5760BC] hover:bg-[#fff] hover:font-semibold duration-200'>
                          새로운 롤링 페이퍼 만들기
                        </a>
                      </Link>
                  </div>
                  <div className='w-5/6 mt-12 ml-28 mx-auto flex justify-between items-center text-[#ccc] font-medium'>
                    <div className='w-1/2'>Title / Address</div>
                    <div className='w-40 text-center'>Owner</div>
                    <div>Write</div>
                    <div>Polygonscan</div>
                  </div>
                  {/** Loading */}
                  <Loading isLoading={isLoading} />
                  {isConnected && (
                  <div>
                      {papers.map((paper:IPaperItem, index:number) => {
                          return (
                            <section key={index} className='bg-[#fff] drop-shadow-lg flex my-4 h-24 items-center rounded-xl'>
                              <div className='w-32 flex justify-center'>
                                <Image 
                                  src="/designAssets/user-icon.svg"
                                  alt="User"
                                  width={50}
                                  height={50}
                                  />
                              </div>
                              <div className='w-full mx-auto flex justify-between items-center mr-20'>
                                <div className='w-1/2'>
                                  <div className='text-[#292929] font-semibold'>{paper.title}</div>
                                  <div className='text-[#ccc] text-sm ml-1'>{paper.nftContract}</div>
                                </div>
                                <div className='text-center w-40'>{paper.ownerName}</div>
                                <Link href={`/paper/${paper.itemId}`}>
                                  <a className='hover:cursor-pointer px-2 py-2 rounded-md hover:bg-[#E7E7E7] duration-200 mr-4'>
                                    <Image 
                                        src="/designAssets/edit-icon.svg"
                                        alt="Edit"
                                        width={30}
                                        height={30}
                                      />
                                  </a>
                                </Link>
                                <Link href={`https://mumbai.polygonscan.com/address/${paper.owner}`}>
                                    <a target="_blank" className='hover:cursor-pointer px-2 py-2 rounded-md hover:bg-[#E7E7E7] duration-200 flex justify-center items-center mr-5'>
                                      <Image 
                                        src="/designAssets/link-icon.svg"
                                        alt='link'
                                        width={30}
                                        height={30}
                                      />
                                    </a>
                                </Link>
                              </div>
                            </section>
                          )
                      })}
                  </div>
                  )}
              </div>
            </div>
            <Footer />
            <ConnectModal 
              isConnected={isConnected}
              connectWallet={connectWallet}
              isModal={isModal}
              changeModal={changeMadal}
            />
        </main>
  )
}

export default ListPapers
