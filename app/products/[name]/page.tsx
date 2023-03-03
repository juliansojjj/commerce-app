import styles from './products.module.css'
import ProductForm from '../../components/product/ProductForm'
import FavoriteButton from '../../components/product/FavoriteButton';

const fetchData = async(type:string,id:number)=>{
    const res = await fetch(`http://localhost:8000/api/products/model/${type}-${id}`, { cache: 'no-store' });
    return res.json()
}

export default async function Product({params}: {
    params: { name: string } }){
    const props = params.name.split('--')
    const type = props[1]
    const id : number = parseInt(props[2])

    const res = await fetchData(type,id)
    const item = res.product

    return(
    <div className={styles.container}>
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoTitle}>{item.name} <FavoriteButton itemId={item.id}/> </div>
                <div>${item.price}</div>
                <ProductForm stock={item.stock} product={item}/>
            </div>
        </div>  
    </div>
    )
}