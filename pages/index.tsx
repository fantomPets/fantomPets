import { 
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useNFTs,
  useOwnedNFTs, } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { editionDropAddress} from "../const/details";
import { NavbarMain } from "../components/Navbar/NavbarMain";
import { AnimalCard } from "../components/AnimalCard/AnimalCard";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: NFTs, isLoading: isNFTsLoading, error } = useNFTs(editionDropContract);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <div className={styles.heroBackground}>
          
       
        </div>
      <NavbarMain />
      <Image
          src="/fantomPetsBanner.png"
          width={1200}
          height={362}
          alt="fantomPets"
          className={styles.banner}
          />

        <p className={styles.description}>
          Care for your <a>fantomPet</a>!
        </p>

        <div className={styles.grid}>
        {!!NFTs &&
                NFTs.map((nft, i) => {
                  return <AnimalCard nft={nft} animalId={Number(nft?.metadata?.id)} key={i} isNFTsLoading={isNFTsLoading} editionDropContract={editionDropContract}></AnimalCard>;
                })}
        </div>
      </main>
    </div>
  );
};

export default Home;
