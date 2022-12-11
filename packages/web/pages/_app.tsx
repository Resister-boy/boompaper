import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { Layout } from "../components";
import { AppProvider } from '../context';
import { ToastContainer } from 'react-toastify';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const styles = {
  container: `flex flex-col bg-gradient h=[100vh]`
}

const { chains, provider } = configureChains(
  [ chain.polygonMumbai ], 
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
 );

const { connectors } = getDefaultWallets({
  appName: "Boompaper",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <WagmiConfig client = {wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <main className={styles.container}>
              <Component {...pageProps} />
            </main>
            <ToastContainer theme='dark' />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </AppProvider>
  )
}


export default MyApp

// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import { Web3ContextProvider } from '../context'
// import { ToastContainer } from 'react-toastify'

// import 'react-toastify/dist/ReactToastify.css'

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Web3ContextProvider>
//       <>
//         <Component {...pageProps} />
//         <ToastContainer
//           hideProgressBar
//           position="bottom-right"
//           autoClose={2000}
//         />
//       </>
//     </Web3ContextProvider>
//   )
// }

// export default MyApp
