import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider,darkTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from 'react-hot-toast';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'cf60df6d47c2397d5593d1b1532f6333',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  return (
    
      <ThemeProvider>
       
        <div className='bg-gradient-to-b from-gray-300 to-white from-10% min-h-screen'>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
        <Toaster />
        <div className='pt-5'>
        <Nav />
        </div>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
    </div>
    </ThemeProvider>
  
  );
}

export default MyApp;
