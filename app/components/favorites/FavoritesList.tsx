"use client"

import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import { useAuthContext } from '../../Context/AuthStore'
import FavoriteButton from '../product/FavoriteButton'

import styles from './favorites.module.css'

import { Product } from '../../../interfaces'
import { ErrorBoundaries } from '../../../utilities'
import ErrorAdvice from './ErrorAdvice';

const favoritesFetch = (url:string)=> fetch(url, { cache: 'no-store' })
.then((res)=> {return res.json()})
.then((unit)=>{
    return Promise.all(unit.favorite.map( (item:any)=>{
        const promise = new Promise(async(resolve,reject)=>{
            await fetch(`http://localhost:8000/api/products/${item.item_id}`)
            .then((res)=>resolve(res.json()))
            .catch(err=>reject(err))
        })
        return promise
    }))
    
})
.catch(err=>console.log(err))

export default function FavoritesList({containerType}:{containerType:'profile'|'menu'}){
    const {user} = useAuthContext()
    const {data, isValidating, error} = useSWR(`http://localhost:8000/api/favorites/${user?.id}`,favoritesFetch)

    if(data?.length == 0) return(
        <div>
                <div className={`${styles.favoritesContainer} ${styles.profile}`}>
                    <div>No hay favoritos</div>
                </div>
        </div>
    )
        return(
            <div>
                <ErrorBoundaries fallbackComponent={<p> ERROR </p>}>
                <div className={`${styles.favoritesContainer} ${styles.profile}`}>
                    {data?.map((item:any)=>{
                        return(
                            <div className={styles.profileGeneral} key={item.product.id} >
                                <Link 
                                className={styles.profileSon} 
                                href={`/products/${item.product.name
                                    .trim()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("-")}--${item.product.type.trim().toLowerCase()}--${item.product.id}`}
                                >
                                    <div>{item.product.name}</div>
                                    <img src={item.product.image} alt={item.product.name} />
                                </Link>
                                <div className={styles.favoriteButton}>
                                    <FavoriteButton itemId={item.product.id}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                </ErrorBoundaries>
            </div>
        )
}