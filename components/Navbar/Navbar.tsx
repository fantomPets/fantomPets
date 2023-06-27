import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import React, { useState, useRef, useEffect } from "react";
import { NFTStorage, File, Blob } from "nft.storage";
import toast, { Toaster } from 'react-hot-toast';
import toastStyle from "../../utils/toastConfig";
import { css } from "@emotion/react";
import { PacmanLoader } from "react-spinners";


const storageKey = process.env.NEXT_PUBLIC_NFT_STORAGE as string;
const client = new NFTStorage({ token: storageKey });

type Props = {
    pet: any;
    animalId: number;
  };

export function Navbar({pet, animalId}: Props) {
  
    const address = useAddress();
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const [petCID, setPetCID] = useState<string | null>(null);
    const [meunImage, setMenuImage] = useState<string | null>(null);
    

    const handleSave = async () => {
        try {
          setIsSaving(true);
          const petData = JSON.stringify(pet);
          const petCID = await client.storeBlob(new Blob([petData]));
          console.log("petCID", petCID)
       
          // Store the CID in local storage
          localStorage.setItem(`petCID${animalId}${address}`, petCID);

          setPetCID(petCID);
            
          console.log("Pet data saved successfully!");
          setIsSaving(false);
          setIsSaved(true);
          toast('Pet data saved successfully!', {
            icon: "✅",
            style: toastStyle,
            position: 'bottom-center',
          });
        } catch (error) {
          console.log("Error saving pet data:", error);
          setIsSaving(false);
          setIsSaved(false);
          toast(`Error saving pet data: ${error}`, {
            icon: "❌",
            style: toastStyle,
            position: 'bottom-center',
          });
        }
      };

      const downloadPet = async () => {
        try {
            const cid = localStorage.getItem(`petCID${animalId}${address}`);
            if (cid) {
          
            // Create a JSON Blob with the pet data
            const petBlob = new Blob([JSON.stringify({cid: cid})], { type: "application/json" });

            // Generate a temporary URL for the pet Blob
            const petURL = URL.createObjectURL(petBlob);

            // Create a temporary <a> element to trigger the download
            const downloadLink = document.createElement("a");
            downloadLink.href = petURL;
            downloadLink.download = `petData${animalId}${address}.json`; // Specify the file name
            downloadLink.click();

            // Clean up by revoking the temporary URL
            URL.revokeObjectURL(petURL);

            console.log("Pet data downloaded successfully!");
            }
            } catch (error) {
            console.log("Error downloading pet data:", error);
            }
        };

        const fileUpload = (event:any) => {
            const file = event.target.files[0];
            const reader = new FileReader();
        
            reader.onload = async (e) => {

                try {
                    if (e.target && e.target.result) {
                        const contents = e.target.result as string;
                        const parsedData = JSON.parse(contents);
                        const { cid } = parsedData;
                        console.log("petCID", cid)
                
                        if (cid) {
                        // Store the CID in local storage
                        localStorage.setItem(`petCID${animalId}${address}`, cid);
                
                        setPetCID(cid);
                        console.log("Pet data uploaded from file successfully!");
                        window.location.reload();
                        } else {
                        console.log("Invalid file format: missing CID");
                        }
                    }
                } catch (error) {
                    console.log("Error parsing file:", error);
                }
                };
            reader.readAsText(file);
        };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <div className={styles.menuContainer}>
                    <div className={`${styles.menu} ${isOpen ? styles.menuVisible : ""}`}>
                    {isSaving ? (
                        <ul>
                            <li className={styles.loader}>
                                <PacmanLoader color="#faebd7" size={25} />
                            </li>
                        </ul>
                        ) : (
                        <ul>
                            <li>
                                <Link href="/"><button className={styles.navBtn}>Home</button></Link>
                            </li>
                            <li>
                                <button className={styles.navBtn} onClick={handleSave}>Save to Download</button>
                            </li>
                            {isSaved &&
                            <li>
                                <button className={styles.navBtn} onClick={downloadPet}>Download Pet</button>
                            </li>
                            }
                            <li >
                                <input className={styles.navInput} type="file" accept=".json" onChange={fileUpload}/>
                            </li>
                        </ul>
                          )}
                    </div>

                    <div className={`${styles.content} ${isOpen ? styles.contentShifted : ""}`}>
                    </div>
                    {!isOpen ? 
                        <Image
                            src="/logo.png"
                            width={48}
                            height={48}
                            alt="fantomPets"
                            className={styles.toggleButton}
                            onClick={toggleMenu}
                        />
                        : <Image
                        src="/closeMenu.png"
                        width={48}
                        height={48}
                        alt="fantomPets"
                        className={styles.toggleButton}
                        onClick={toggleMenu}
                        />
                        }
                    </div>
            </div>
            <div className={styles.navRight}>
                <div className={styles.navConnect}>
                    <ConnectWallet 
                    btnTitle="login"
                    className={styles.walletBtn}
                    />
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    duration: 5000,
                    // Default options for specific types
                    success: {
                    duration: 3000,
                    },
                }}
                />
            </nav>
        </div>
  
      
    
        );
}
