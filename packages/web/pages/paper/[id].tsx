import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../../components/Footer/Footer'
//import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AppContext, getPaperContractByAddress } from '../../context'
import { Contract } from 'ethers';
import { IPaperNFT } from '../../interfaces'
import Loading from '../../components/common/Loading'

const PaperN : NextPage = () => {

  const router = useRouter();
  const itemId  = router.query.id as string;

  const { paperManagerContract } = useContext(AppContext)
  const { web3Provider, signer} = useContext(AppContext)
  const { setPaperId } = useContext(AppContext)
  //const [ paper, setPaper ] = useState()
  const [ NFTs, setNFTs ] = useState<IPaperNFT[]>()
  const [ paperTitle, setPaperTitle ] = useState<string>()
  const [ paperOwnerName , setPaperOwnerName ] = useState<string>()
  const [ isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // /paper/comment 에서 paperId 를 참조하기 위해서 미리 세팅해 둔다. 
    setPaperId(Number(itemId))
    fetchPaperByItemId()
  }, [itemId])

  const fetchPaperByItemId = async() => {
    try { 
      console.log("fetchPaperByItemId paperManagerContract:",paperManagerContract)
      if(!paperManagerContract) return;
      const paperContractContent = await paperManagerContract.getPaperItemById(Number(itemId))
      //setPaper(response)
      console.log("fetchPaperByItemId setPaper:",paperContractContent)
      // paperContract의  title, ownerName
      setPaperTitle(paperContractContent.title);
      setPaperOwnerName(paperContractContent.ownerName);
      // console.log('NFTInfo', NFTInfo)
      await fetchNFTByTokenURI1(paperContractContent)
    } catch(error) {
      console.log(error)
    }
  }

  const fetchNFTByTokenURI1 = async(paper0 : Contract) => {
    setIsLoading(true)
    try {
      console.log("fetchNFTByTokenURI paper:",paper0)
      if(!paper0) return;
      const NFTContract = paper0.nftContract 
      console.log("NFTContract:",NFTContract)
      const tempPaperContract = await getPaperContractByAddress(NFTContract, web3Provider, signer)
      //const tempPaperContract = tempPaperContract.nftContract 
      console.log('tempPaperContract', tempPaperContract)
      const response = await tempPaperContract.getAllTokenURI();
      console.log('response:', response)

      const NFTList = [];
      for(let i = 0; i < response.length; i++) {
        const [path, file] = response[i].tokenURI.slice(7).split("/");
        const ipfsUri = `https://${path}.ipfs.dweb.link/${file}`;
        const meta = await axios.get(ipfsUri);
        const { name, description, image } = meta.data;
        const NFT : IPaperNFT = {
          name, 
          description,
          image: `https://ipfs.io/ipfs/${image.slice(7)}`
        }
        console.log('NFT:', NFT)
        NFTList.push(NFT)
      }
      setNFTs(NFTList)
      setIsLoading(false)
    } catch(error) {
      console.log(error)
    }
  }

  return (
      <main className='mt-44 h-auto relative'>
        <div className='w-4/5 mx-auto mb-48'>
          <div className='flex'>
            <div className='w-3/4'>
              <div className='text-2xl font-semibold'>{paperTitle}</div>
              <div className='text-base mt-1'>
                <span className='font-medium text-sm mr-2'>By</span>
                <span className='font-semibold text-[#333]'>{paperOwnerName}</span>
              </div>
              <div className='text-[#6C727A] mt-4 mx-2 text-sm'>{paperTitle}</div>
            </div>
            <div className='w-1/4 flex justify-evenly items-end'>
              <div className='hover:cursor-pointer'>
                <Image 
                  src="/designAssets/star-icon.svg"
                  alt="star"
                  width={30}
                  height={30}
                  />
              </div>
              <div className='hover:cursor-pointer'>
                <Image 
                  src="/designAssets/link-icon.svg"
                  alt="link"
                  width={25}
                  height={25}
                  />
              </div>
              <div className='hover:cursor-pointer'>
                <Image 
                  src="/designAssets/modify-icon.svg"
                  alt='modify'
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
          <div className='my-12 border-b border-[#D1D6DB]'></div>
          <Loading isLoading={isLoading} />
            <section>
            {NFTs !== undefined && 
            (<div className='flex flex-wrap justify-start'>
                {NFTs.map((NFT, index) => {
                    return(
                      <div key={index} className="w-52 mx-5 mb-8 rounded-md overflow-hidden shadow-lg">
                        <Image 
                          src={NFT.image} 
                          alt={NFT.name} 
                          width={215}
                          height={207}
                          /> 
                          <div className='h-auto px-1 py-1'>
                            <div className='h-16'>{NFT.description}</div>
                            <div className='text-right'>
                              <span className='text-sm mr-2'>From.</span>
                              <span className='text-sm text-[#6C727A]'>{NFT.name}</span>
                            </div>
                          </div>
                      </div>
                    )
                  })
                }
              </div>)}
          </section>
          <div className='flex justify-center'>
            <Link href="/paper/comment">
              <a className='bg-[#5760BC] py-3 px-10 border-2 text-[#fff] rounded-2xl hover:border-[#5760BC] hover:bg-[#fff] hover:text-[#5760BC] hover:font-semibold'>
                  {paperOwnerName}에게 NFT로 메시지 전달 
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
  )
}

export default PaperN
