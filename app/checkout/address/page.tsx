import styles from '../checkout.module.css'
import AddressForm from './AddressForm';

export default function Address(){
    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <h2>Agregue una dirección de facturación</h2>
                <AddressForm />
            </div>
        </div>
    )
}