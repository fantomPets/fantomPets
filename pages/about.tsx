import React from 'react';
import Image from 'next/image';
import styles from "../styles/About.module.css";
import { NavbarMain } from "../components/Navbar/NavbarMain";

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
        <NavbarMain/>
       
      <h1 className={styles.heading}>About</h1>
      <p>
        fantomPets is a virtual pet game where the most adorable fantomPets enter your world and your heart ❤️!
        Take a selfie 🤳🏾, play a game 🕹️, and spend time 🥳 with your favorite fantomPet 👻🐶.
      </p>
      <h2 className={styles.heading}>Quick Start</h2>
      <p>
        Download the app to your device. This is a progressive web app to enable ultra-portability and allow you to move your pet to any device at anytime.
      </p>
        <ul>
            <h3 className={styles.heading}>Desktop/Laptop</h3>
            <p>
                To download to desktop/Laptop, go to <a target="_blank" href="https://fantompets.com">https://fantompets.com</a>. Find the install button on the right side of the search bar as shown below. Click install and the app will be installed on your computer.
            </p>
            <Image src="/install_button.png" alt="Install Button" width={215} height={77} className={styles.aboutImage}/>
            <h3 className={styles.heading}>Mobile Device</h3>
            <p>
                To download to a mobile device, go to <a target="_blank" href="https://fantompets.com">https://fantompets.com</a>. Find the add to homescreen button and the app will install on your phone!
            </p>
        </ul>
      <h2 className={styles.heading}>Game Play</h2>
      <ol>
        <li>
          <strong>Starting your game:</strong> First, purchase your favorite fantomPet by clicking &rdquo;Insert Coin.&rdquo; You will be prompted to use your preferred wallet and follow the steps to complete the transaction. Each fantomPet costs 0 FTM coin (+ fee to process).
          <p>
          <Image src="/example_fantomPet.png" alt="Example fantomPet" width={201} height={274} className={styles.aboutImage}/>
          </p>
          <p>
            <em>Note: This game is built on the fantom blockchain. If you have never interacted with the blockchain, no worries, we made it easier for you to purchase a pet. You can log in with your email or &rdquo;continue as guest.&rdquo; If it&rsquo;s your first time, you can purchase FTM (Fantom) on exchanges like Coinbase or ask a friend that&rsquo;s into crypto stuff for some FTM (Fantom). If you are having troubles with logging in, feel free to reach out to us at 0xfantompets@gmail.com.</em>
            <p>
            <Image src="/example_wallet.png" alt="Example wallet" width={231} height={216} className={styles.aboutImage}/>
            </p>
            </p>

        </li>
        <li>
          <strong>Once you have purchased your first pet:</strong> The button for that pet will now say &rdquo;Press Start.&rdquo; Click on the button and begin your wonderful journey with your fantom pet!
          <p>
          <Image src="/example_fantomPet2.png" alt="Example fantomPet" width={188} height={256} className={styles.aboutImage}/>
          </p>
        </li>
        <li>
        <p>
          <strong>Categories:</strong> There are four primary categories: Heart, Activity, Food, and Energy. The secondary category is the overall health of your pet. All pets start at 50% health and are a little sad. Click around and see how you can cheer up your pet!
        </p>
        <Image src="/fantom_categories.png" alt="Fantom Bear" width={268} height={569} className={styles.aboutImage}/>
        </li>
        <li>
          <strong>Saving your game:</strong> Before you close the app, save your game to maintain your progress. To save your game, click on the fantom Bear in the top left corner.
          <p>
          <Image src="/fantom_bear.png" alt="Fantom Bear" width={113} height={137} className={styles.aboutImage}/>
          </p>
          After clicking on the fantom Bear, a menu will appear. Click &rdquo;Save&rdquo; to download.
          <p>
          <Image src="/save_button.png" alt="Save Button" width={267} height={572} className={styles.aboutImage}/>
          </p>
          When you click &rdquo;Save,&rdquo; Pacman will appear while saving!
          <p>
          <Image src="/pacman.png" alt="Pacman" width={213} height={115} className={styles.aboutImage}/>
            </p>
          And then a new option will appear, and you can now download your pet! This allows you to load your pet on any device.
          <p>
          <Image src="/download_pet.png" alt="Download Pet" width={251} height={214} className={styles.aboutImage}/>
          </p>
         <p>
            <em>Note: You have to log in with the same wallet address on the new device to play with your fantomPet.</em>
         </p>
        </li>
        <li>
          <strong>Device Transfer:</strong> Click &rdquo;Choose File&rdquo; and upload the file you saved to the app on your new device and enjoy!
        </li>
        <li>
          <p>
            <strong>Closing the Menu:</strong> Click on the fantom Bear with &rdquo;x&rdquo; eyes to go back to your previous screen.
          </p>
        </li>
      </ol>
      <p>We hope you have a fantastic time with your new fantomPet! Enjoy the game and create lasting memories with your fantomPet. If you have any questions or need assistance, feel free to reach out to us. Happy playing!</p>
    </div>
  );
};
