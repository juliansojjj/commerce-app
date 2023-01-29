import MainCart from '../components/cart/MainCart';
import styles from './cart.module.css'

export default function Cart(){
    return(
        <div className={styles.container}>
            <div className={styles.info}> 
                <h2>Productos</h2>
                <MainCart/>
            </div>
        </div>
    )
}