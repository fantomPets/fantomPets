import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { ThirdwebNftMedia,
    Web3Button,
    useAddress,
    useOwnedNFTs,
    MediaRenderer,
} from "@thirdweb-dev/react";
import React, { useState, useRef, useEffect } from "react";
import { editionDropAddress } from "../../const/details";
import toast, { Toaster } from 'react-hot-toast';
import toastStyle from "../../utils/toastConfig";

type Props = {
    editionDropContract: any;
    nft: any;
    animalId: number;
    isNFTsLoading: boolean;
  };

export const AnimalCard = ({ nft, animalId, isNFTsLoading, editionDropContract }: Props) => {
    const address = useAddress();
    const isLoading = isNFTsLoading;
    const id = animalId;
    const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
    );

    const ownedNft = ownedNfts?.find((ownedNft) => Number(ownedNft?.metadata?.id) === id);
    const quantityOwned = ownedNft?.quantityOwned || 0;
    const isOwned = quantityOwned > 0;
  
    return (
        <>
            {isLoading === true ? (
                <div className={styles.card}>
                Loading...
                </div>
            ) : (
                <div className={styles.card}>
                {isOwned ? ( 
                    <Link href={`/${editionDropAddress}/${id}`}>
                    <MediaRenderer
                    className={styles.nftImage}
                    src={nft.metadata.image}
                    alt={nft.metadata.description}
                    width={"200px"}
                    height={"200px"}
                    />
                    </Link>
                    ) : (
                    <MediaRenderer
                    className={styles.nftImage}
                    src={nft.metadata.image}
                    alt={nft.metadata.description}
                    width={"200px"}
                    height={"200px"}
                    />
                    )
                }
                {address ? (
                    <>
                    <p>You own {quantityOwned}</p>
                    {isOwned ? (
                        <Link href={`/${editionDropAddress}/${id}`}>
                        <button className={styles.playBtn}>Press Start</button>
                        </Link>
                    ) : (
                         <Web3Button
                         contractAddress={editionDropAddress}
                         action={(contract) =>
                         contract.erc1155.claim(id, 1)
                         }
                         onSuccess={async () => {
                         await refetchOwnedNfts();
                         toast(`You just bought a fantomPet!`, {
                            icon: "👻",
                            style: toastStyle,
                            position: 'top-center',
                          });
                         }}
                         style={{ width: "100%", marginTop: "10px" }}
                         className={styles.playBtn}
                         onError={(error) => {
                            toast(`Something went wrong: ${error}`, {
                                icon: "👻",
                                style: toastStyle,
                                position: 'top-center',
                              });
                         }}
                     >
                         Insert Coin
                     </Web3Button>
                        )}
                    </>
                ) : (
                    <p className={styles.buyPetMessage}>Login to buy!</p>
                )}
            </div>
            )}
        </>
        )

}