
import styles from '../../checkout/checkout.module.css'

export default function AddressesSkeleton(){
    return(
        <div className={styles.multipleAddressContainer}>
            <div className={styles.skeletonAddressContainer}></div>
            <div className={styles.skeletonAddressContainer}></div>
            <div className={styles.skeletonAddressContainer}></div>
        </div>
    )
}