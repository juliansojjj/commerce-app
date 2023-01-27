import styles from './favorites.module.css'

export function SkeletonProfileList(){
    return(
        <div className={styles.profileSkeleton}> 
            <div className={styles.profileSkeletonSon}>
                <div className={styles.titleFall}></div>
                <div className={styles.imgFall}></div>
            </div>
        </div>
    )
}

export function SkeletonMenuList(){
    return(
        <div></div>
    )
}