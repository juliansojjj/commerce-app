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
    let repo : Product[] = []
    unit.favorite.map( (item:any)=>{
        return fetch(`http://localhost:8000/api/products/${item.item_id}`)
        .then((res)=>{
            return res.json()
        })
        .then(product=>{
            repo.push(product.product)
        })
        .catch(err=>{console.log(err)})
    })
    return repo
    
})
.catch(err=>console.log(err))

export default function FavoritesList({containerType}:{containerType:'profile'|'menu'}){
    const {user} = useAuthContext()
    const {data, isValidating, error} = useSWR(`http://localhost:8000/api/favorites/${user?.id}`,favoritesFetch,{suspense:true, fallbackData:[]})
    console.log(data)

    if(data?.length == 0) return(
        <div>
            { containerType == 'profile' 
            ?
                <div className={`${styles.favoritesContainer} ${styles.profile}`}>
                    <div>No hay favoritos</div>
                </div>
            :
                <div className={`${styles.favoritesContainer} ${styles.menu}`}>
                    <div>No hay favoritos</div>
                </div>
            }
        </div>
    )
        return(
            <div>
                <ErrorBoundaries fallbackComponent={<p> ERROR </p>}>
                {containerType == 'profile' 
                ? 
                <div className={`${styles.favoritesContainer} ${styles.profile}`}>
                    {data?.map((item:any)=>{
                        return(
                            <div className={styles.profileGeneral} key={item.id} >
                                <Link 
                                className={styles.profileSon} 
                                href={`/products/${item.name
                                    .trim()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("-")}--${item.type.trim().toLowerCase()}--${item.id}`}
                                >
                                    <div>{item.name}</div>
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className={styles.favoriteButton}>
                                    <FavoriteButton itemId={item.id}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className={`${styles.favoritesContainer} ${styles.menu}`}>
                    {data?.map((item:any)=>{
                        return(
                            <div className={styles.profileGeneral} key={item.id} >
                                <Link 
                                className={styles.profileSon} 
                                href={`/products/${item.name
                                    .trim()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("-")}--${item.type.trim().toLowerCase()}--${item.id}`}
                                >
                                    <div>{item.name}</div>
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className={styles.favoriteButton}>
                                    <FavoriteButton itemId={item.id}/>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                </ErrorBoundaries>
            </div>
        )
}