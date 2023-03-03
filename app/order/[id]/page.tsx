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

    if(order.msg === 'No existe esa orden') {
        return(
        <div className={styles.container}>
            <h3>Hubo un error con la orden, vuelva a intentarlo más tarde</h3>
        </div>)}

    return(
        <div className={styles.container}>
            <UniqueOrder orderData={order.order} orderCart={cart.order}/>
        </div>
    )
}