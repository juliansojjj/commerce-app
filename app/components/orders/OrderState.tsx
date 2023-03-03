import clsx from 'clsx'
import styles from '../../order/order.module.css'

export default function OrderState({sent,postReceived,userReceived}:
    {sent:boolean,postReceived:boolean,userReceived:boolean}){

    return(
        <div className={styles.orderStateContainer}>
            <div className={clsx(styles.stateCircle,{[styles.completeStateCircle] : sent})}></div>
            <div className={clsx(styles.stateLine,{[styles.completeStateLine] : sent})}></div>
            <div className={clsx(styles.stateCircle,{[styles.completeStateCircle] : postReceived})}></div>
            <div className={clsx(styles.stateLine,{[styles.completeStateLine] : postReceived})}></div>
            <div className={clsx(styles.stateCircle,{[styles.completeStateCircle] : userReceived})}></div>
        </div>
    )
}