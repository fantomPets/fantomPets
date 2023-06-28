import { 
ConnectWallet,
Web3Button,
useAddress,
useContract,
useNFT,
useOwnedNFTs, 
MediaRenderer,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Animal.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Activity from "../../components/Activity/Activity";
import toastStyle from "../../utils/toastConfig";
import toast, { Toaster } from 'react-hot-toast';


type fantomPet = {
    happiness: number;
    hunger: number;
    exercise: number;
    health: number;
    sleep: number;
    timestamp: number;
    timeSleep: number;
    timeEat: number;
    timeExercise: number;
    timeLove: number;
};

export default function GamePage()  {

    const address = useAddress();
    const router = useRouter();
    const animalContract = router.query.contract as string;
    const animalId = router.query.animalId as string;
    const id = Number(animalId);
    const time = Date.now() as number;
    const [lovePetCount, setLovePetCount] = useState(0);
    const [feedPetCount, setfeedPetCount] = useState(0);
    const [energyCount, setEnergyCount] = useState(0);
    const webcamRef = useRef<any>(null);
    const [imageSrc, setImageSrc] = useState<string | null>();
    const [imgNft, setImgNft] = useState<string | null>();
    const [isPaused, setIsPaused] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const groundHeight = 260;
    const [gameStart, setGameStart] = useState(false);
    const [isSleeping, setIsSleeping] = useState(false);
    const [isEating, setIsEating] = useState(false);
    const [isExercising, setIsExercising] = useState(false);
    const [isLoving, setIsLoving] = useState(false);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [loading, setLoading] = useState({
        load: true,
        loadedOnce: false,
     });
    const [isGameTime, setIsGameTime] = useState(false);
    
    const { contract: editionDropContract } = useContract(animalContract);
    const { data: nft, isLoading: isNftLoading } = useNFT(
        editionDropContract,
        animalId
    );
    const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
        editionDropContract,
        address
        );

    const ownedNft = ownedNfts?.find((ownedNft) => Number(ownedNft?.metadata?.id) === id);
    const quantityOwned = ownedNft?.quantityOwned || 0;
    const isOwned = quantityOwned > 0;

    const [pet, setPet] = useState<fantomPet>({
        hunger: 50,
        happiness: 50,
        exercise: 50,
        sleep: 50,
        health: 50,
        timestamp: time,
        timeSleep: 0,
        timeEat: 0,
        timeExercise: 0,
        timeLove: 0,
    });

    const [petCID, setPetCID] = useState<string | null>(null);

    const health = ((pet.happiness + pet.exercise + pet.sleep + pet.hunger)/4);
    

    useEffect(() => {
      if (!isPaused && !isSleeping) {
        if (health >= 60) { 
          setImgNft(nft?.metadata.image as string)
        } else if (health >= 50) {
          setImgNft(nft?.metadata.semisad as string)
        } else if (health >= 25) {
          setImgNft(nft?.metadata.sad as string)
        } else if (health >= 5) {
          setImgNft(nft?.metadata.mad as string)
        } else if (health === 0) {
          setImgNft(nft?.metadata.dead as string)
        }
      }

  }, [nft, health, isPaused, isSleeping]);



    const feedPet = () => {
        if (feedPetCount < 2 && !isEating && pet.hunger < 100) {
          setPet((prevPet) => ({
            ...prevPet,
            hunger: prevPet.hunger + 10 < 0 ? 0 : prevPet.hunger + 10,
            timeEat: Date.now() as number,
          }));
    
          setfeedPetCount((prevCount) => prevCount + 1);
          setImgNft(nft?.metadata.eat as string);
          setIsPaused(true);

          setTimeout(() => {
            setImgNft(nft?.metadata.image as string);
            setIsPaused(false);
          }, 5000);
    
          setTimeout(() => {
            setfeedPetCount((prevCount) => prevCount - 1);
          }, 14400000); // Set the cooldown period to 4 hours
        } else if (pet.hunger >= 100) {
            setIsEating(true);
            toast(`I'm soo full, I can't eat any more!`, {
                icon: "👻",
                style: toastStyle,
                position: 'top-center',
              });
        } else {
            setIsEating(true);
            toast(`I'm soo full, can we eat in 4 hours? Save your game!`, {
                icon: "👻",
                style: toastStyle,
                position: 'top-center',
              });
        }
      };

    const endActivity = () => {
      setGameStart(false);
      setIsGameTime(false);
      walkPet();
    };

    const walkPet = () => {
        if(!isExercising && pet.exercise < 100 && energyCount < 2) {
        setPet((prevPet) => ({
            ...prevPet,
            exercise: prevPet.exercise + 10 > 100 ? 100 : prevPet.exercise + 10,
            timeExercise: Date.now() as number,
        }));

        setEnergyCount((prevCount) => prevCount + 1);
        setTimeout(() => {
            setEnergyCount((prevCount) => prevCount - 1);
          }, 900000); // Set the cooldown period to 1 hour
        } else if (pet.exercise >= 100) {
            setIsExercising(true);
            toast(`I'm tired, can we play in 15 minutes? We can keep playing, but I won't gain energy. Save your game!`, {
                icon: "👻",
                style: toastStyle,
                position: 'top-center',
              });
        } else {
            setIsExercising(true);
            toast(`I'm tired, can we play in 15 minutes? We can keep playing, but I won't gain energy. Save your game!`, {
                icon: "👻",
                style: toastStyle,
                position: 'top-center',
              });
        }
    };
    
    const lovePet = () => {
        if (lovePetCount < 2 && !isLoving && pet.happiness < 100 && !isSleeping) {
          setPet((prevPet) => ({
            ...prevPet,
            happiness: prevPet.happiness + 10 > 100 ? 100 : prevPet.happiness + 10,
            timeLove: Date.now() as number,
          }));
    
          setLovePetCount((prevCount) => prevCount + 1);
          setImgNft(nft?.metadata.happysquint as string);
          setIsPaused(true);

          setTimeout(() => {
            setImgNft(nft?.metadata.image as string);
            setIsPaused(false);
          }, 5000);
    
          setTimeout(() => {
            setLovePetCount((prevCount) => prevCount - 1);
          }, 3600000); // Set the cooldown period to 1 hour
        } else {
            setIsLoving(true);
            toast(`I'm feeling the love, can we cuddle in an hour? Save your game!`, {
                icon: "👻",
                style: toastStyle,
                position: 'top-center',
              });
        }
      };

    const sleepPet = () => {
    if (!isSleeping && pet.sleep < 100) {
        setIsSleeping(true);
        setPet((prevPet) => ({
            ...prevPet,
            sleep: prevPet.sleep + 10 > 100 ? 100 : prevPet.sleep + 10,
            timeSleep: Date.now() as number,
        }));
        console.log("timeSleep", pet.timeSleep);
        setIsPaused(true);
        setImgNft(nft?.metadata.sleep as string);

        setTimeout(() => {
          setIsSleeping(false);
          setImgNft(nft?.metadata.image as string);
          setIsPaused(false);
        }, 3600000); // Set the cooldown period to 1 hour
    } else {
        setIsSleeping(true);
        toast(`I like naps, I'll be up in an hour. Save your game!`, {
            icon: "👻",
            style: toastStyle,
            position: 'top-center',
          });
    }
    };  


    const passTime = () => {
        setPet((prevPet) => ({
        ...prevPet,
        hunger: prevPet.hunger - 10 > 0 ? prevPet.hunger - 10 : 0,
        happiness: prevPet.happiness - 10 > 0 ? prevPet.happiness - 10 : 0,
        exercise: prevPet.exercise - 10 > 0 ? prevPet.exercise - 10 : 0,
        sleep: prevPet.sleep - 10 > 0 ? prevPet.sleep - 10 : 0,
        }));
    };

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const cid = localStorage.getItem(`petCID${animalId}${address}`);
            if (cid) {
              const fetchURL = `https://ipfs.io/ipfs/${cid}`;
              const pet = await fetch(fetchURL, { method: "GET" }).then((data) => data.json());
              setPet(pet);
      
              const currentTime = Date.now();
      
              if (currentTime < pet.timeSleep + 3600000) {
                setIsSleeping(true);
                setImgNft(nft?.metadata.sleep as string);
                setTimeout(() => {
                  setIsSleeping(false);
                  setImgNft(nft?.metadata.image as string);
                }, pet.timeSleep + 3600000 - currentTime); // Set the cooldown period to 1 hour
              }
              if (currentTime < pet.timeEat + 14400000) {
                setIsEating(true);
                setTimeout(() => {
                  setIsEating(false);
                }, pet.timeEat + 14400000 - currentTime); // Set the cooldown period to 4 hours
              }
              if (currentTime < pet.timeExercise + 3600000) {
                setIsExercising(true);
                setTimeout(() => {
                  setIsExercising(false);
                }, pet.timeExercise + 3600000 - currentTime); // Set the cooldown period to 1 hour
              }
              if (currentTime < pet.timeLove + 3600000) {
                setIsLoving(true);
                setTimeout(() => {
                  setIsLoving(false);
                }, pet.timeLove + 3600000 - currentTime); // Set the cooldown period to 1 hour
              }
      
              const elapsedTime = currentTime - pet.timestamp;
              const interval = 14400000; // 4 hours
              const numPasses = Math.floor(elapsedTime / interval);
              console.log("Time Passed:", numPasses);
              for (let i = 0; i < numPasses; i++) {
                passTime();
              }
      
              const timer = setInterval(passTime, interval); // Run passTime() every 4 hours
              return () => {
                clearInterval(timer);
              };
      
              console.log("load pet once", pet);
            }
          } catch (error) {
            toast(`Error fetching pet data: ${error}`, {
              icon: "👻",
              style: toastStyle,
              position: "top-center",
            });
          }
        };
      
        fetchData();
      }, [animalId, address, nft?.metadata.image, nft?.metadata.sleep]);
      

    const capture = async () => {
            const imageUrl = imgNft as string;
            const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
            try {
                const response = await fetch(proxyUrl);
                if (response.ok && webcamRef && webcamRef.current) {
                    const webcamCanvas = webcamRef.current.getCanvas()!;
                    const petImageElement = document.createElement("img");
                    petImageElement.src = proxyUrl;

                    const canvas = document.createElement("canvas");
                    canvas.width = webcamCanvas.width;
                    canvas.height = webcamCanvas.height;
                    const context = canvas.getContext("2d");
                
                    if(context){
                        // Draw the webcam video frame
                        context.drawImage(
                            webcamRef.current.video,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                    
                        petImageElement.onload = () => {
                        // Draw the pet image on top of the webcam frame
                        const x = (canvas.width - (petImageElement.width/10))/12;
                        const y = (canvas.height - (petImageElement.height/10))/12;
                        context.drawImage(petImageElement, x, y, 100, 100); // Adjust the position and size as needed
                    
                        // Get the resulting image as data URL
                        const imageSrc = canvas.toDataURL("image/jpeg");
                        setImageSrc(imageSrc);
                        
                        }
                    }
                }
            } catch (error) {
           
            }
          
    };

    const downloadSelfie = () => {
        if(imageSrc) {
            const link = document.createElement("a");
            link.href = imageSrc;
            link.download = "fatonPetAndMe.jpg";
            link.click();
        }
        walkPet();
      };
  
      
    const videoConstraints = {
    facingMode: "user", // Use front-facing camera
    };

    const stopWebcam = () => {
        if (isCameraOn) {
            setIsCameraOn(false);
            setImageSrc(null);
        }
      };

    const gameTime = () => {
        setIsGameTime(true);
        setGameStart(true);
    };


    return (
      <div className={styles.body}>
        <div className={styles.container}>
            <Navbar pet={pet} animalId={id} isGameTime={isGameTime}/>
            {isOwned ? ( 
            <main className={styles.main}>
                <div>
                    {isCameraOn &&
                    <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} className={styles.webcamView}/>
                    }
                    {!gameStart &&
                        <Image
                        src="/camera.png"
                        alt="camera"
                        width={42}
                        height={42}
                        priority={true}
                        onClick={() => {setIsCameraOn(true); capture();}}
                        className={styles.camera}
                        />
                    }
                    {imageSrc && (
                        <Image src={imageSrc} alt="Selfie" width={320} height={240} className={styles.imgSelfie}/>
                    )}
                </div>
                {!gameStart && !isCameraOn && !isSleeping &&
                <Image
                        src="/gamecontroller.png"
                        alt="gamecontroller"
                        width={42}
                        height={42}
                        priority={true}
                        onClick={gameTime}
                        className={styles.gamecontroller}
                />
                }
                {isSleeping && !isCameraOn &&
                <Image
                        src="/noGame.png"
                        alt="gamecontroller"
                        width={42}
                        height={42}
                        priority={true}
                        className={styles.gamecontroller}
                />
                }
                {!gameStart && !isCameraOn &&
                <Image
                        src="/sleep.png"
                        alt="sleep"
                        width={42}
                        height={42}
                        priority={true}
                        className={styles.sleep}
                        onClick={sleepPet}
                />
                }
                {!gameStart && !isCameraOn && !isSleeping &&
                <Image
                        src="/eat.png"
                        alt="eat"
                        width={42}
                        height={42}
                        priority={true}
                        className={styles.eat}
                        onClick={feedPet}
                />
                }
                {isSleeping && !isCameraOn &&
                    <Image
                        src="/noEat.png"
                        alt="eat"
                        width={42}
                        height={42}
                        priority={true}
                        className={styles.eat}
                    />
                }
            {gameStart && 
                <Activity groundHeight={groundHeight} petImage={nft?.metadata.image}/>
            }
            {!gameStart && nft &&
            <>
                {!isCameraOn ? (
                    <>
                        <div className={styles.grid}>
                            {isNftLoading ? (
                                "Loading..."
                            ) : (
                              <a onClick={lovePet}>
                                <MediaRenderer
                                    className={styles.nftImage}
                                    src={imgNft as string}
                                    alt={"fantomPet"}
                                    width={"400px"}
                                    height={"400px"}
                                    
                                   
                                />
                              </a>
                            )}
                        </div>
                    </>
                        ) : ( 
                        <>
                            <MediaRenderer
                                className={styles.nftImageCamera}
                                src={imgNft as string}
                                alt={"fantomPet"}
                                width={"150px"}
                                height={"150px"}
                                
                            />
                        </>)}
                </>
            }

            {imageSrc && (
              <button onClick={downloadSelfie} className={styles.downloadSelfie}>Download Selfie</button>
            )}
            {isCameraOn && (
              <button onClick={stopWebcam} className={styles.downloadSelfie}>Camera Off</button>
             )}
             {gameStart && 
                <button onClick={endActivity} className={styles.endActivity}>End Activity</button>
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
            {!gameStart && !isCameraOn &&
                <Footer 
                hunger={pet.hunger} 
                happiness={pet.happiness} 
                exercise={pet.exercise} 
                sleep={pet.sleep} 
                health={health}
                />
            }
            </main>
        ) : (
         
            <main className={styles.main}>
                <h2>Loading your fantomPet. If you don&rsquo;t own this pet, the page will not load!</h2>
            </main>
           )}
        </div>
      </div>
    );
};
  
  