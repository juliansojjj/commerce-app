import styles from './products.module.css'
import ProductForm from '../../components/product/ProductForm'

const fetchData = async(type:string,id:number)=>{
    //const res = await fetch(`http://localhost:8000/api/products/${id}`, { cache: 'no-store' });
    const res = await fetch(`http://localhost:8000/api/products/model/${type}-${id}`, { cache: 'no-store' });
    //const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { cache: 'no-store' });
    return res.json()
}

export default async function Product({params}){
    const props = params.name.split('--')
    const type = props[1]
    const id : number = props[2]

    const res = await fetchData(type,id)
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
                <ProductForm stock={item.stock} itemId={id}/>
            </div>
        </div>  
    </div>
    )
}