
import styles from './payment.module.css'
import CardForm from '../components/payment/CardForm';
import { Suspense } from 'react';

export default function Payment({searchParams}: {
    params: { slug: string };
    searchParams: { [key: string]: string  };
  }){

    return(
        <div className={styles.container}>
            <CardForm operationId={searchParams.id} operationType={searchParams.p}/>
        </div>
    )
}