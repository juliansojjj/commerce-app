import styles from './components/home.module.css';
import {Be_Vietnam_Pro} from '@next/font/google';
import Image from 'next/image';
import Logo from '../public/logo.svg'
import ArrowDown from '../public/icons/arrow-down.svg'

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function Home(){
    return(
        <main className={styles.main}>
            <h1 className={styles.mainTitle}>
                <Image src={Logo} alt='Flagon Logo' height={170} className={styles.mainLogo}/>
            </h1>
            <h2 className={`${vietnamPro.className} ${styles.mainTitle}`}>Calidad y técnica en materiales únicos</h2>
            <div className={styles.arrowContainer}>
                <Image src={ArrowDown} alt=''/>
            </div>
        </main>
    )
}