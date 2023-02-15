import UniqueOrder from '../../components/orders/UniqueOrder'
import styles from '../order.module.css'

const fetchOrder = async (orderId:string)=>{
    const res = await fetch(`http://localhost:8000/api/orders/${orderId}`)
    return res.json()
}

const fetchOrderCart = async (orderId:string)=>{
    const res = await fetch(`http://localhost:8000/api/orders/cart/${orderId}`)
    return res.json()
}
export default async function Order({params}: {
    params: { id: string }
  }){
    const order = await fetchOrder(params.id)
    const cart = await fetchOrderCart(params.id)
    console.log(cart)
    return(
        <div className={styles.container}>
            <UniqueOrder orderData={order.order} orderCart={cart.order}/>
        </div>
    )
}