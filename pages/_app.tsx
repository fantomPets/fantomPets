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
import { Provider } from 'react-redux';
import { store } from '../utils/app/store';


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "fantom";

function MyApp({ Component, pageProps }: AppProps) {

  const walletConnectConfig = walletConnect({projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string,});
  walletConnectConfig.meta.name = "fantomPets"; // change the name
  walletConnectConfig.meta.iconURL = "https://fantompets.com/icon-384x384.png"; // change the icon

  return (
    <ThirdwebProvider 
      dAppMeta={{
        name: "fantomPets",
        description: "a virtual pet game on the fantom opera network",
        logoUrl: "https://fantompets.com/icon-384x384.png",
        url: "https://fantompets.com",
        isDarkMode: true,
      }}
      activeChain={activeChain}
      clientId= {process.env.NEXT_PUBLIC_CLIENT_ID as string}
      supportedWallets={[
        metamaskWallet(), 
        localWallet({ persist: true }),
        coinbaseWallet(), 
        walletConnect(),
        magicLink({
          apiKey: process.env.NEXT_PUBLIC_MAGIC as string,
        }) 
      ]}
    >
      <Provider store={store}>
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
      </Provider>
    </ThirdwebProvider>
  );
}

export default MyApp;
