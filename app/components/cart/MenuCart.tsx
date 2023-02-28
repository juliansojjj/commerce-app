"use client";

import { useCartContext } from '../../Context/cart/CartStore';
import { Item } from '../../../interfaces/index';
import styles from '../menu/menu.module.css'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from 'next/link';
import clsx from 'clsx';

export default function MenuCart({checkout}:{checkout:'TRUE'|'FALSE'}){
    const {items, removeProduct} = useCartContext() 
    
    if(items && items.length > 0){
        return(
            <div className={clsx(styles.cartItemsContainer,
                {[styles.checkoutContainer] : checkout == 'TRUE'})}
                >
                    {items?.map((unit:Item)=>{
                        return(
                            <div className={styles.cartItem} key={unit.product.id}>
                                <img src={unit.product.image} alt={unit.product.name} />
                                <div className={styles.itemInfo}>
                                    <Link href={`/products/${unit.product.name
                  .trim()
                  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .split(" ")
                  .join("-")}--${unit.product.type.trim().toLowerCase()}--${unit.product.id}`}>
                                    <div className={clsx(styles.itemInfoTitle,
                                        { [styles.checkoutInfoTitle]: checkout == "TRUE" })}>{unit.product.name}</div>
                                    </Link>
                                    <div>Cant: {unit.amount}</div>
                                    <div className={styles.itemInfoPrice}>${unit.amount*unit.product.price}</div>
                                </div>
                                {checkout == 'TRUE'
                                ? ''
                                :
                                <div className={styles.deleteButton} onClick={()=>removeProduct(unit.product)}>
                                    <DeleteIcon />
                                </div>}
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