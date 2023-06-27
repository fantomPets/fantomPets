import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useRouter } from 'next/router';

type Props = {
    hunger: number;
    happiness: number;
    exercise: number;
    sleep: number;
    health: number;
};

export function Footer( {hunger, happiness, exercise, sleep, health}: Props) {


    return  (
        <>
            <div className={styles.gridFooter}>
                <div>
                    <h2 className={styles.footMarket}>Heart ❤️</h2>
                    <div className={styles.meter}>
                        <div className={styles.meterPet} style={{ width: `${happiness}%` }}></div>
                    </div>
            
                </div>
                <div>
                    <h2 className={styles.footMarket}>Activity 🏃🏽‍♀️</h2>
                    <div className={styles.meter}>
                        <div className={styles.meterActive} style={{ width: `${exercise}%` }}></div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.footMarket}>Food 🍔</h2>
                    <div className={styles.meter}>
                        <div className={styles.meterFood} style={{ width: `${hunger}%` }}></div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.footMarket}>Energy 😴</h2>
                    <div className={styles.meter}>
                        <div className={styles.meterEnergy} style={{ width: `${sleep}%` }}></div>
                    </div>
                </div>
                <div>
                    <div className={styles.healthMeter}>
                        <div className={styles.meterHealth} style={{ width: `${health}%`}}></div>
                    </div>
                </div>
            </div>

           
        </>
    );
}