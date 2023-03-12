"use client"

import styles from "../shop.module.css";
import Link from "next/link";
import ProductCard from "../../components/productCard/ProductCard";
import useSWR from 'swr';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
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

export default function Category({params}: {
  params: { category: string };
  searchParams: { [key: string]: string  };
}) {
  const [link, setLink] = useState(`http://localhost:8000/api/products/category/${params.category}`)
  const [searchInput,setSearchInput] = useState('')
  const [orderFilter, setOrderFilter] = useState<'mayorPrice'|'minorPrice'|'mostSold'>('mostSold')
  const debounceRef = useRef<NodeJS.Timeout>()

  const repo: any[] = [];
  const {data, mutate} = useSWR(link,fetchProducts)
  const array = data?.length > 0 ? data.sort((a:any, b:any) => a.serialNumber - b.serialNumber) : [];

  const handleSearch = async(e:ChangeEvent<HTMLInputElement>)=>{
    if(debounceRef.current) clearTimeout(debounceRef.current)
    
    if(!e.target?.value.trim()) {
      setSearchInput('')
    } else setSearchInput(e.target.value)

    debounceRef.current = setTimeout(() => {
      if(!e.target?.value.trim()) {
        mutate(setLink(`http://localhost:8000/api/products/category/${params.category}`))
      }else {
        mutate(setLink(`http://localhost:8000/api/products/category/search/${params.category}---${e.target.value.trim().toLowerCase()}`))
    }
    }, 500);
  }

  const handleDelete = ()=>{
    if(!searchInput) return
    else{
      setSearchInput('')
      mutate(setLink(`http://localhost:8000/api/products/category/${params.category}`))
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

if(repo.length > 1){
  console.log(repo)
  if(orderFilter == 'mayorPrice') repo.sort((a,b)=>{
    if(b.rep) return b.repeat[0].price - a.price
    else if(a.rep) return b.price - a.repeat[0].price
    else return b.price - a.price})
  if(orderFilter == 'minorPrice') repo.sort((a,b)=>{
    if(a.rep) return a.repeat[0].price - b.price
    else if(b.rep) return a.price - b.repeat[0].price
    else return a.price - b.price})
  if(orderFilter == 'mostSold') repo.sort((a,b)=>{
    if(a.rep) return b.units_sold - a.repeat[0].units_sold
    else if(b.rep) return b.repeat[0].units_sold - a.units_sold
    else return b.units_sold - a.units_sold})
}

  return (
    <div className={styles.shopLayout}>
      <div className={styles.dashboardContainer}>
            <select className={clsx(styles.inputField, vietnamPro.className)}
            onChange={(e:any)=>setOrderFilter(e.target.value)}
            value={orderFilter}>
              <option value='mostSold'>Más vendidos</option>
              <option value='minorPrice'>Menor precio a mayor</option>
              <option value='mayorPrice'>Mayor a menor precio</option>
            </select>
            <div className={styles.searchInputContainercontainer}>
            <input 
            type="text"  
            className={clsx(styles.searchInput, vietnamPro.className)}
            placeholder={`Buscar productos dentro de ${params.category}`}
            onChange={handleSearch}
            value={searchInput}
            />
            <CancelIcon onClick={handleDelete} className={styles.cancelBtn}/>
        </div >
        </div>
        {repo.length == 0 && 
        <div>
          <h5>No hay resultados para tu búsqueda</h5>
          <Link href='/shop'>Volver a ver todos los productos</Link>  
        </div>}
        <div className={styles.shopContainer}>
        {repo?.map((item) => {
            return (
              <ProductCard repeat={item.rep} data={item.rep ? item.repeat : item}/>
            )
        })}
      </div>
    </div>
  );
}
