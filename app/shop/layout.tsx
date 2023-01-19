import { Children } from "../../interfaces"
import Dashboard from "../components/dashboard/Dashboard"
import styles from './shop.module.css'

export default function ShopLayout({children}:Children){
    return(
        <div className={styles.shopLayout}>
            <Dashboard />
            {children}
        </div>
    )
}