import styles from './products.module.css'
import ProductForm from '../../components/product/ProductForm'
import FavoriteButton from '../../components/product/FavoriteButton';
import Link from 'next/link';

const fetchData = async(type:string,id:number)=>{
    const res = await fetch(`http://localhost:8000/api/products/model/${type}-${id}`, { cache: 'no-store' });
    return res.json()
}

const fetchSerialNumber = async(serialNumber:number)=>{
    const res = await fetch(`http://localhost:8000/api/products/models/${serialNumber}`, { cache: 'no-store' });
    return res.json()
}

export default async function Product({params}: {
    params: { name: string } }){
    const props = params.name.split('--')
    const type = props[1]
    const id : number = parseInt(props[2])

    const res = await fetchData(type,id)
    const item = res.product
    const entireCatalog = await fetchSerialNumber(item?.serialNumber)

    return(
    <div className={styles.container}>
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
                <div className={styles.infoTitle}>{item.name} <br />{item.type}<FavoriteButton itemId={item.id}/> </div>
                <div>${item.price}</div>
                {entireCatalog.product.length > 1 && 
                <div className={styles.catalogContainer}>
                {entireCatalog.product.map((unit:any)=>{
                    if(unit.type !== item.type)
                    return(
                        <Link href={`/products/${unit.name
                            .trim()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-")}--${unit.type.trim().toLowerCase()}--${unit.id}`}
                            className={styles.productCard}>
                            <img src={unit.image} alt={`${unit.name} ${unit.type}`} />
                        </Link>
                    )
                })}
                </div>}
                <ProductForm stock={item.stock} product={item}/>
                <div className={styles.details}>
                    <h4>Medidas</h4>
                    <div>{item.measures}</div>
                    <h4>Descripción</h4>
                    <div>{item.description}</div>
                </div>
            </div>
        </div>  

    </div>
    )
}