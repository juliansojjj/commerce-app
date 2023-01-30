"use client";

import { useCartContext } from '../../Context/cart/CartStore';
import { Item } from '../../../interfaces/index';
import styles from '../menu/menu.module.css'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from 'next/link';

export default function MenuCart(){
    const {items, removeProduct} = useCartContext() 
    
    if(items && items.length > 0){
        return(
            <div className={styles.cartItemsContainer}>
                    {items?.map((unit:Item)=>{
                        return(
                            <div className={styles.cartItem} key={unit.product.id}>
                                <img src={unit.product.image} alt={unit.product.name} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemInfoTitle}>{unit.product.name}</div>
                                    <div>Cant: {unit.amount}</div>
                                    <div className={styles.itemInfoPrice}>${unit.amount*unit.product.price}</div>
                                </div>
                                <div className={styles.deleteButton} onClick={()=>removeProduct(unit.product)}>
                                    <DeleteIcon />
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
    return(
        <div className={styles.emptyContainer}>
            <div>El carrito está vacío</div>
            <Link href='/shop'>Ver los productos</Link>
        </div>
    )
}