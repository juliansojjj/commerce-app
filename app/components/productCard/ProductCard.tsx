"use client";

import { useState } from "react";
import { Product } from "../../../interfaces";
import Link from "next/link";
import styles from "../../shop/shop.module.css";

export default function ProductCard({ data }) {
  const [value, setValue] = useState(0);

  const handleIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={styles.generalCard}>
        <div className={styles.carrouselContainer}>
            {data.map((item: Product, i) => {
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
                className={styles.cardImage}
            />
            <div className={styles.textContainer}>
                <div>{data[value].name}</div>
                <div className={styles.price}>${data[value].price}</div>
            </div>
        </Link>
    </div>
  );
}
