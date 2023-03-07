"use client";

import { useState } from "react";
import { Product } from "../../../interfaces";
import Link from "next/link";
import styles from "../../shop/shop.module.css";
import FavoriteButton from "../product/FavoriteButton";

export default function ProductCard({ data, repeat }:{data:any, repeat:boolean}) {
  const [value, setValue] = useState(0);

  const handleIndex = (index: number) => {
    setValue(index);
  };

  if(repeat) {
    return (
    <div className={styles.generalCard}>
        <div className={styles.favoriteButton}>
                <FavoriteButton itemId={data[value].id} />
              </div>
        <div className={styles.carrouselContainer}>
            {data.map((item: Product, i:number) => {
            if (i !== value) {
                return (
                <div
                    key={item.id}
                    className={styles.itemContainer}
                    onClick={() => handleIndex(i)}
                >
                    <img src={item.image} alt={item.name} />
                </div>
                );
            }
            })}
        </div>
        <Link
              href={`/products/${data[value].name
                .trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .split(" ")
                .join("-")}--${data[value].type.trim().toLowerCase()}--${data[value].id}`}
                className={styles.productCard}
                >
            <img
                src={data[value].image}
                alt={data[value].name}
            />
            <div className={styles.textContainer}>
                <div>{data[value].name}</div>
                <div className={styles.price}>${data[value].price}</div>
            </div>
        </Link>
    </div>
  )}

  return(
    <div className={styles.generalCard}>
              <div className={styles.favoriteButton}>
                <FavoriteButton itemId={data.id} />
              </div>
              <Link
                href={`/products/${data.name
                  .trim()
                  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .split(" ")
                  .join("-")}--${data.type.trim().toLowerCase()}--${data.id}`}
                key={data.id}
                className={styles.productCard}
              >
                <img
                  src={data.image}
                  alt={data.name}
                />
                <div className={styles.textContainer}>
                  <div>{data.name}</div>
                  <div className={styles.price}>${data.price}</div>
                </div>
              </Link>
            </div>
  )
}
