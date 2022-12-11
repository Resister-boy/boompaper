import type { NextPage } from 'next'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from "react";
import ConnectModal from '../../components/common/modal/ConnectModal';
import CreatePaperModal from '../../components/common/modal/CreatePaperModal';
import { Footer } from '../../components/Footer/Footer';
import { AppContext } from "../../context";

const CreatePaper : NextPage = () => {

   const { isConnected, connectWallet } = useContext(AppContext);
   const { paperManagerContract } = useContext(AppContext);
   const [ papers, setPapers ] = useState([]);
   const [ paperContract, setPaperContract ] = useState('DEFAULT ADDRESS') 
   const [ isMinting, setIsMinting ] = useState(false);
   const [ isModal, setIsModal ] = useState<number>(0)

   //const { paperContract  } = useContext(AppContext);

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
   
    useEffect(() => {
        changeMadal()
        fetchPaperList()
    }, [])

    const fetchPaperList = async() => {
        try {
            if(!paperManagerContract) return;
               console.log(paperManagerContract)
               const response = await paperManagerContract.getPaperItems();
                setPapers(response)
                console.log(response)
                console.log('papers', papers)
            } catch(error) {
                console.log(error)
        }
    }

    const handleSubmit = async (event : any) => {
        console.log("handleSubmit");
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // // Get data from the form.
        const data = {
            title: event.target.title.value,
            name: event.target.name.value,
        }

        if ( !paperManagerContract ) return;
        console.log("paperManagerContract:", paperManagerContract)
        try {
            // data.name = ownerName
            // TODO error handling 해주자 
            // TODO button  일시적으로  disabled 해주자
            setIsMinting(true);
            const txn1 = await paperManagerContract.createPaperItem(data.title, "BOOM", data.name);
            console.log("txn1:", txn1);

            setIsMinting(false);

            console.log("paperManagerContract:", paperManagerContract.address);
            setPaperContract(txn1.hash)

            
            // TODO opensea collection link? 알아보자!

            // const totalItems = await paperManagerContract.getTotalPaperItems();
            // console.log(`https://testnets.opensea.io/assets/mumbai/${paperManagerContract.address}/${totalItems}`)
            //const newPaperContractAddr = txn1.contractAddress;
            //console.log("newPaperContractAddr:", newPaperContractAddr);
            // const txn2 = await paperManagerContract.getPaperItemById(1);
            //console.log("txn2:", txn2);
        } catch(error) {
            console.log(error)   
        }
    }

    return (
        <main className='mt-44 relative'>
            <div className='w-4/5 mx-auto mb-48'>
                <div className='text-3xl font-semibold'>
                    새로운 롤링 페이퍼를 생성한 뒤 메시지를 받고 싶은 사람에게 링크를 공유하세요!
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='w-full mt-8'>
                        <label htmlFor="name" className='block text-xl font-medium'>당신의 이름을 넣어주세요.</label>
                        <input id='name' type="text" className='mt-2 w-full border-[#D1D6DB] rounded-md' placeholder='당신의 이름을 입력해주세요. 실명이 아니어도 됩니다.(최대 32자)' maxLength={32} required />
                    </div>
                    <div className='w-full mt-8'>
                        <label htmlFor="title" className='block text-xl font-medium'>초대 메시지</label>
                        <textarea id="title" placeholder='다른 사람들이 초대받고 확인할 메시지를 입력해주세요' className='mt-2 w-full h-32 border-[#D1D6DB] rounded-md resize-none' maxLength={32} required />
                    </div>

                    { !isMinting && (
                    <div className='mt-8 flex justify-center'>
                        <Link href="/paper/list">
                            <a className='w-1/5 py-3 text-center mx-1 border-2 border-[#CDD1F2] rounded-xl bg-[#CDD1F2] text-[#5760BC] font-semibold hover:border-[#CDD1F2] hover:bg-[#fff]'>
                                취소
                            </a>
                        </Link>
                    {isConnected &&
                        <button type='submit' className='w-1/5 py-3 border-2 border-[#fff] mx-1 rounded-xl bg-[#5760BC] text-[#fff] font-medium hover:border-[#5760BC] hover:bg-[#fff] hover:text-[#5760BC] hover:font-semibold'>
                            새로운 롤링 페이퍼 생성
                        </button>}
                    </div>
                    )}
                </form>
            </div>
            <Footer />
            {isConnected 
            && paperContract !== 'DEFAULT ADDRESS' 
            && (
                <CreatePaperModal 
                    paperContract={paperContract}
                />
            )}
            <ConnectModal 
                isConnected={isConnected}
                connectWallet={connectWallet}
                isModal={isModal}
                changeModal={changeMadal}
            />
        </main>
    )
  
}

export default CreatePaper
