"use client"

import FavoriteEmpty from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilled from '@mui/icons-material/FavoriteOutlined';
//import {use} from 'react' no actual method to put a query without infinite loop
import { useAuthContext } from '../../Context/AuthStore';
import useSWR, { mutate } from 'swr'
import axios from 'axios';

const fetchFavorite = (url:string)=> fetch(url, { cache: 'no-store' }).then(res=> res.json()).catch(err=>console.log(err))

const postFavorite = async(userId:number, itemId:number)=>{
        await axios.post(`http://localhost:8000/api/favorites`,{
            item_id:itemId,
            user_id:userId 
        })
}

const deleteFavorite = async(userId:number, itemId:number)=>{
    await axios.delete(`http://localhost:8000/api/favorites/${userId}-${itemId}`)
}

export default function FavoriteButton({itemId}:{itemId:number}){
    const {user} = useAuthContext()
    const {data, error, mutate} = useSWR(`http://localhost:8000/api/favorites/item/${user?.id}-${itemId}`,fetchFavorite)

    const mutatePostFavorite = async(userId:number, itemId:number)=>{
        await mutate(postFavorite(userId, itemId))
    }

    const mutateDeleteFavorite = async(userId:number, itemId:number)=>{
        await mutate(deleteFavorite(userId, itemId))
    }

    if(data == 'TRUE') return(
        <FavoriteFilled onClick={()=>mutateDeleteFavorite(user?.id!,itemId)} />        
    )
    return(
        <FavoriteEmpty onClick={()=>mutatePostFavorite(user?.id!,itemId)} />)
}