import styles from './header.module.css'
import Link from 'next/link'
import {Be_Vietnam_Pro} from '@next/font/google';
import Image from 'next/image';
import Icon from '../../public/icon.svg'
import MenuButton from './MenuButton';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function Header(){
    return(
        <div className={styles.header}>
            <Link href='/'>
                <Image src={Icon} alt='Flagon Icon' height={40} className={styles.headerIcon}/>
            </Link>
            <div className={`${styles.centerContainer} ${vietnamPro.className}`}>
                <Link href='/about'>Nosotros</Link>
                <Link href='/products'>Productos</Link>
                <Link href='/contact'>Contacto</Link>
            </div>
            <MenuButton/>
        </div>
    )
}