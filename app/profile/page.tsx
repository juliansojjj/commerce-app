import { Suspense } from 'react'
import FavoritesList from '../components/favorites/FavoritesList'
import { SkeletonProfileList } from '../components/favorites/SkeletonList'
import UserInfo from '../components/sign/UserInfo'
import styles from './profile.module.css'
import MultipleUserOrders from '../components/orders/MultipleUserOrders';

export default async function Profile(){
    
    return(
        <div className={styles.container}>
            <UserInfo />
            <div className={styles.hr}/>
            <div className={styles.listsContainer}> 
                <div>
                    <h3>Favoritos</h3>
                    <FavoritesList containerType='profile'/>
                    {/*<Suspense fallback={<SkeletonProfileList />}>
                        <FavoritesList containerType='profile'/>
                    </Suspense>*/}
                </div>
                <div>
                    <h3>Órdenes</h3>
                    <MultipleUserOrders />
                </div>
            </div>
        </div>
        
    )
}