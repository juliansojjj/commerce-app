import styles from './products.module.css'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Products(){

    return(
        <div className={styles.productsContainer}>
            Estos son los productos
        </div>
    )
}