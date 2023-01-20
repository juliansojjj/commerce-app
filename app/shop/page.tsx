import styles from './shop.module.css'
import Link from 'next/link'
import Dashboard from '../components/dashboard/Dashboard';

const fetchProducts = async()=>{
    const res = await fetch("http://localhost:8000/api/products", { next: { revalidate: 120 } });
    return res.json()
}

export default async function Shop(){
    const repository = await fetchProducts();

    return(
            <div className={styles.shopContainer}>
                {repository.map(item=>{
                    return(
                        <Link href={`/products/${item.id}`}
                        key={item.id}
                        className={styles.productCard}>
                            <img src={item.image} alt={item.name} className={styles.cardImage}/>
                            <div className={styles.textContainer}>
                                <div>{item.name}</div>
                                <div className={styles.price}>${item.price}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
    )
}