"use client"

import FavoriteEmpty from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilled from '@mui/icons-material/FavoriteOutlined';
//import {use} from 'react' no actual method to put a query without infinite loop
import useSWR, { mutate } from 'swr'
import axios from 'axios';

const fetchFavorite = (url)=> fetch(url, { cache: 'no-store' }).then(res=> res.json()).catch(err=>console.log(err))

const postFavorite = async(userId, itemId)=>{
        await axios.post(`http://localhost:8000/api/favorites`,{
            item_id:itemId,
            user_id:userId 
        })
}

const deleteFavorite = async(userId, itemId)=>{
    await axios.delete(`http://localhost:8000/api/favorites/${userId}-${itemId}`)
}

export default function FavoriteButton({itemId}:{itemId:number}){
    const {data, error, mutate} = useSWR(`http://localhost:8000/api/favorites/item/2-${itemId}`,fetchFavorite)
    console.log(data)

    const mutatePostFavorite = async(userId, itemId)=>{

        await mutate(postFavorite(userId, itemId))
    }

    const mutateDeleteFavorite = async(userId, itemId)=>{

        await mutate(deleteFavorite(userId, itemId))
    }

    if(data == 'FALSE') return(
        <FavoriteEmpty onClick={()=>mutatePostFavorite(2,itemId)} />
    )
    else return(
        <FavoriteFilled onClick={()=>mutateDeleteFavorite(2,itemId)} />
    )
}