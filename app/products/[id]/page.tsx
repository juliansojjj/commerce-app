import styles from './products.module.css'

export default function Product({params}){
    return(
    <div className={styles.container}>
        {params.id}
    </div>
    )
}