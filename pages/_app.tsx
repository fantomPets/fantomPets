import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  magicLink,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {activeChain} from "../const/details";
import Head from 'next/head';


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "fantom-testnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}
      supportedWallets={[
        metamaskWallet(), 
        localWallet({ persist: true }),
        coinbaseWallet(), 
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string}),
        magicLink({
          apiKey: process.env.NEXT_PUBLIC_MAGIC as string,
        }) 
      ]}
    >
       <Head>
        <meta charSet="UTF-8"/>
        <title>fantomPets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@_fantomPets"/>
        <meta name="twitter:title" content="fantomPets"/>
        <meta name="twitter:description" content="fantomPets"/>
        <meta name="twitter:image" content="https://fantompets.com/logo.png"/>
        <meta property="og:url" content="https://fantompets.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="fantomPets"/>
        <meta property="og:description" content="fantomPets"/>
        <meta property="og:image" content="https://fantompets.com/logo.png"/>
        <link rel="manifest" href="/manifest.webmanifest"/>
      </Head>

      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
