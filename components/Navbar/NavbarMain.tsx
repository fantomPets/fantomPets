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
import Sound from "react-sound";


export function NavbarMain() {
  
    const address = useAddress();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const [isPaused, setIsPaused] = useState(true);
    
    const handleSound = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <div className={styles.menuContainer}>
                    <div className={`${styles.menu} ${isOpen ? styles.menuVisible : ""}`}>
                        <ul>
                            <li>
                                <Link href="/" onClick={() => setIsOpen(false)}><button className={styles.navBtn}>Home</button></Link>
                            </li>
                            <li>
                                <Link href="/about" onClick={() => setIsOpen(false)}><button className={styles.navBtn}>About</button></Link>
                            </li>
                            <li>
                                <Link href="https://twitter.com/_fantompets" onClick={() => setIsOpen(false)} target="_blank"><button className={styles.navBtn}>Twitter</button></Link>
                            </li>
                            <li>
                                <Link href="https://github.com/fantomPets/fantomPets" onClick={() => setIsOpen(false)} target="_blank"><button className={styles.navBtn}>Github</button></Link>
                            </li>
                            <li>
                                <button className={styles.navBtn} onClick={handleSound}>
                                    {isPaused ? "Sound On" : "Sound Off"}
                                </button>
                            </li>
                        </ul>
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
            {!isPaused ? 
            <Sound url="/fPetsIntro.mp3" playStatus={Sound.status.PLAYING} volume={25} loop={true}/>
            : <Sound url="/fPetsIntro.mp3" playStatus={Sound.status.PAUSED} volume={25} loop={true}/>
            }
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
