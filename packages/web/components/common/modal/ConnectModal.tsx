import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectState } from '../../../interfaces/AppState'

const ConnectModal = ({ isConnected, connectWallet, isModal, changeModal }: ConnectState) => {
  return (
    <section>
      {isModal === 1 
        ? (
          <div className='absolute top-0 left-0 w-screen h-screen select-none z-40'>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transform -translate-y-1/2 p-4 w-full max-w-xl h-full md:h-auto z-50">
              <div className="relative bg-white rounded-lg shadow">
                <Link href={'/'}>
                  <a className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </a>
                </Link>
                  <div className="pt-12 px-12 pb-8 text-center">
                    {!isConnected
                      ? <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      : (
                        <div className='my-4'>
                          <Image 
                            src="/designAssets/check-icon.svg"
                            alt="check"
                            width={50}
                            height={50}
                          />
                        </div>
                      )
                    }
                    {!isConnected  
                      ? (<h3 className="mb-5 text-lg font-normal text-gray-500">Metamask를 연결한 뒤에 사용할 수 있습니다. Metamask를 연결해주세요</h3>)
                      : (<h3 className="mb-5 text-lg font-normal text-gray-500">연결되었습니다.</h3>)}
                    {
                      !isConnected  
                      ? (
                        <button onClick={connectWallet} data-modal-toggle="popup-modal" type="button" className="text-white bg-[#6670E2] hover:bg-[#4652D9] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                          <span>Connect Wallet</span>
                        </button>
                      ) : (
                        <button onClick={changeModal} data-modal-toggle="popup-modal" type="button" className="text-white bg-[#6670E2] hover:bg-[#4652D9] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                          <span>Close</span>
                      </button>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          )
          : null}
    </section>
  )
}

export default ConnectModal