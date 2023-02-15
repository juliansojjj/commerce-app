import { Suspense } from 'react'
import FavoritesList from '../components/favorites/FavoritesList'
import { SkeletonProfileList } from '../components/favorites/SkeletonList'
import SignOutButton from '../components/sign/SignOutButton'
import styles from './profile.module.css'

export default function Profile(){
    
    return(
        <div className={styles.container}>
            <SignOutButton />
            <h3>Favoritos</h3>
            <FavoritesList containerType='profile'/>
            {/*<Suspense fallback={<SkeletonProfileList />}>
                <FavoritesList containerType='profile'/>
            </Suspense>*/}
        </div>
        
    )
}