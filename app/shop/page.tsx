"use client"

import styles from "./shop.module.css";
import Link from "next/link";
import ProductCard from "../components/productCard/ProductCard";
import FavoriteButton from "../components/product/FavoriteButton";
import useSWR from 'swr';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/CancelRounded';
import { Be_Vietnam_Pro } from "@next/font/google";
import clsx from 'clsx';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const fetchProducts = async (url:string) => fetch(url, {
    next: { revalidate: 120 },
  })
  .then(res=>res.json())
  .then(info=>{
    if(info.product) return info.product
    else return info
  })

export default function Shop() {
  const [link, setLink] = useState(`http://localhost:8000/api/products/`)
  const [searchInput,setSearchInput] = useState('')
  const repo: any[] = [];
  const {data, mutate} = useSWR(link,fetchProducts)
  const array = data?.length > 0 ? data.sort((a:any, b:any) => a.serialNumber - b.serialNumber) : [];

  const handleSearch = async(e:any)=>{
    if(!e.target?.value.trim()) {
      setSearchInput('')
      mutate(setLink(`http://localhost:8000/api/products/`))
    }else {
      setSearchInput(e.target.value)
      mutate(setLink(`http://localhost:8000/api/products/search/${e.target.value.trim().toLowerCase()}`))
  }
  }

  const handleDelete = ()=>{
    if(!searchInput) return
    else{
      setSearchInput('')
      mutate(setLink(`http://localhost:8000/api/products/`))
  }}

  if(array.length > 1){
  array?.forEach((item: any, i:number, arr:any) => {
    const repeat: any[] = [];
    //si es primero de array y primero repe
    if (i == 0 && item.serialNumber == arr[i + 1].serialNumber) {
      repeat.push(item);
      repo.push({ rep: item.serialNumber, repeat: repeat });
    }
    //si es primero de array pero no se repite
    else if (i == 0 && item.serialNumber !== arr[i + 1].serialNumber) {
      repo.push(item);
    }
    //si es ultimo de array y no se repite
    else if (
      i == arr.length - 1 &&
      item.serialNumber !== arr[i - 1].serialNumber
    ) {
      repo.push(item);
    }
    //si es ultimo en array y se repite
    else if (
      i == arr.length - 1 &&
      item.serialNumber == arr[i - 1].serialNumber
    ) {
      repo.map((x) => {
        if (x.rep == item.serialNumber) {
          x.repeat.push(item);
        }
      });
    }
    //si es primero repe
    else if (
      item.serialNumber == arr[i + 1].serialNumber &&
      item.serialNumber !== arr[i - 1].serialNumber
    ) {
      repeat.push(item);
      repo.push({ rep: item.serialNumber, repeat: repeat });
    }
    //si está en el medio o final repe
    else if (
      item.serialNumber == arr[i + 1].serialNumber ||
      item.serialNumber == arr[i - 1].serialNumber
    ) {
      repo.map((x) => {
        if (x.rep == item.serialNumber) {
          x.repeat.push(item);
        }
      });
    } else {
      repo.push(item);
    }
  })
}
else if(array.length == 1){
  repo.push(array[0])
}
console.log(repo)
  return (
    <div className={styles.shopLayout}>
      <div className={styles.dashboardContainer}>
            <div>Filtro 1</div>
            <div className={styles.searchInputContainercontainer}>
            <input 
            type="text"  
            className={clsx(styles.searchInput, vietnamPro.className)}
            placeholder='Buscar productos'
            onChange={handleSearch}
            value={searchInput}
            />
            <CancelIcon onClick={handleDelete} className={styles.cancelBtn}/>
        </div >
            <div>Filtro 2</div>
        </div>
        {repo.length == 0 && <h5>No hay resultados para tu búsqueda</h5>}
        <div className={styles.shopContainer}>
        {repo && repo?.map((item) => {
            return (
              <ProductCard repeat={item.rep} data={item.rep ? item.repeat : item}/>
            )
        })}
      </div>
    </div>
  );
}
