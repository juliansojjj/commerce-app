import styles from './products.module.css'
import ProductForm from '../../components/product/ProductForm'

const fetchData = async(id)=>{
    const res = await fetch(`http://localhost:8000/api/products/${id}`, { cache: 'no-store' });
    //const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { cache: 'no-store' });
    return res.json()
}

export default async function Product({params}){
    const res = await fetchData(params.id)
    const item = res.product

    return(
    <div className={styles.container}>
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoTitle}>{item.name}</div>
                <div>${item.price}</div>
                <ProductForm stock={item.stock}/>
            </div>
        </div>  
    </div>
    )
}