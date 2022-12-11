import type { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '../components/Footer/Footer';
import React, { useEffect, useState , useContext} from 'react'
import { AppContext, IPaperItem } from "../context";
import { useRouter } from 'next/router';
import Loading from '../components/common/Loading';
import ConnectModal from '../components/common/modal/ConnectModal';

const ListPapers : NextPage = () => {

  const router = useRouter();
  const [ isLoading, setIsLoading] = useState(false);
  const [ papers, setPapers ] = useState([])
  const { isConnected, connectWallet } = useContext(AppContext);
  const { paperManagerContract } = useContext(AppContext);
  const [ isModal, setIsModal ] = useState<number>(0)

  const changeMadal = () => {
    if(!isConnected && isModal === 0) {
      setIsModal(1)
      // console.log(isModal)
    }  else if(!isConnected && isModal === 1) {
      setIsModal(0)
      // console.log(isModal)
    } else if(isConnected) {
      setIsModal(2)
    }
  }


  useEffect(() => {
    if ( !isConnected ) {
      (() => {
        router.replace('/mypage', '/')
      })
    };
    fetchPaperList();
  }, [isConnected])



  const fetchPaperList = async() => {
    setIsLoading(true)
    try {
      if(!paperManagerContract) return;
      console.log(paperManagerContract)
      const response = await paperManagerContract.getPaperItemsByOwner();
      setPapers(response)
      console.log(response)
      console.log('papers', papers)
      setIsLoading(false)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <main className='mt-44 h-auto relative overflow-hidden'>
      <div className='w-4/5 mx-auto mb-60'>
        <div className='flex justify-between items-center'>
            <div className='relative w-auto text-3xl font-semibold'>
                내가 만든 롤링페이퍼
                <div className='absolute top-8 left-1 text-base'>My Papers</div>
            </div>
            <Link href="/paper/create">
              <a className='px-8 py-3 rounded-xl border-2 bg-[#5760BC] text-[#fff] font-medium hover:border-[#5760BC] hover:text-[#5760BC] hover:bg-[#fff] hover:font-semibold duration-200'>
                새로운 롤링 페이퍼 만들기
              </a>
            </Link>
        </div>
        <div className='w-5/6 mt-12 mx-auto flex justify-between items-center text-[#ccc] font-medium'>
          <div className='w-1/2'>Title / Address</div>
          <div>Owner</div>
          <div>Write</div>
          <div>Polygonscan</div>
        </div>
        <Loading isLoading={isLoading} />
        {isConnected && papers.length !== 0 && (
          <div>
              {papers.map((paper:IPaperItem, index:number) => {
                  return (
                    <section key={index} className='bg-[#fff] drop-shadow-lg flex my-4 h-24 items-center rounded-xl'>
                      <div className='w-5/6 mx-auto flex justify-between items-center'>
                        <div className='w-1/2'>
                          <div className='text-[#292929] font-semibold'>{paper.title}</div>
                          <div className='text-[#ccc] text-sm ml-1'>{paper.nftContract}</div>
                        </div>
                        <div className='text-center'>{paper.ownerName}</div>
                        <Link href={`/paper/${paper.itemId}`}>
                          <a className='hover:cursor-pointer px-2 py-1 rounded-md hover:bg-[#E7E7E7] duration-200 mr-4'>
                            <Image 
                                src="/designAssets/edit-icon.svg"
                                alt="Edit"
                                width={30}
                                height={30}
                              />
                          </a>
                        </Link>
                        <Link href={`https://mumbai.polygonscan.com/tx/${paper.owner}`}>
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
        {isConnected && isModal === 2 && (
          <div className='text-center text-2xl font-semibold mt-28'>만들어진 롤링페이퍼가 없습니다</div>
        )}
    </div>
    <Footer />
    {!isConnected && (
      <ConnectModal 
        isConnected={isConnected}
        connectWallet={connectWallet}
        isModal={isModal}
        changeModal={changeMadal}
      />
    )}
</main>
  )
}

export default ListPapers
