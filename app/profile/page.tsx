import SignOutButton from '../components/sign/SignOutButton'
import styles from './profile.module.css'

export default function Profile(){
    return(
        <div className={styles.container}>
            <SignOutButton />
        </div>
    )
}