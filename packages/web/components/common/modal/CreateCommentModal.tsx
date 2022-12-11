import React from 'react'
import Link from 'next/link'
import { PaperState } from '../../../interfaces/AppState'
import Animation from '../animation/animation'

const CreateCommentModal = ({ paperOwnerName, nftAddress, totalNftItems, transactionHash}: PaperState) => {
  return (
    <main>
      <div className='absolute top-0 left-0 w-screen h-screen select-none z-40'>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transform -translate-y-1/2 p-4 w-full max-w-xl h-full md:h-auto z-50">
            <div className="relative bg-white rounded-lg shadow">
            <Link href={'/'}>
              <a className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </a>
            </Link>
            <div className="flex justify-center items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className='text-xl font-semibold text-[#6171FB]'>{paperOwnerName}</h3>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    님을 위한 메시지가 생성되었습니다
                </h3>
            </div>
            <div className="p-2">
              <div className='w-full mx-auto py-1 flex justify-center'>
                <Animation /> 
              </div>
              <div className='flex justify-end'>
                <Link href={`https://testnets.opensea.io/assets/mumbai/${nftAddress}/${totalNftItems}`}>
                  <a target="_blank" className='text-[#2081E2] text-sm mr-1 underline'>Opensea</a>
                </Link>
                <Link href={`https://mumbai.polygonscan.com/tx/${transactionHash}`}>
                  <a target="_blank" className='text-purple-700 text-sm mr-1 underline'>Polygonscan</a>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <Link href="/paper/list">
                    <a data-modal-toggle="defaultModal" className="text-white bg-[#6171FB] hover:bg-[#4D60FF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">롤링페이퍼로 돌아가기</a>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateCommentModal