import styles from "./shop.module.css";
import Link from "next/link";
import ProductCard from "../components/productCard/ProductCard";
import FavoriteButton from "../components/product/FavoriteButton";


const fetchProducts = async () => {
  const res = await fetch("http://localhost:8000/api/products", {
    next: { revalidate: 120 },
  });

  return res.json();
};

export default async function Shop() {
  const repo: any[] = [];
  const data = await fetchProducts();
  const array = data.sort((a, b) => a.serialNumber - b.serialNumber);

  array.forEach((item: any, i, arr) => {
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
  });

  return (
    <div className={styles.shopContainer}>
      {repo.map((item) => {
        if (!item.rep)
          return (
            <div className={styles.generalCard}>
              <div className={styles.favoriteButton}>
                <FavoriteButton itemId={item.id} />
              </div>
              <Link
                href={`/products/${item.name
                  .trim()
                  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .split(" ")
                  .join("-")}--${item.type.trim().toLowerCase()}--${item.id}`}
                key={item.id}
                className={styles.productCard}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cardImage}
                />
                <div className={styles.textContainer}>
                  <div>{item.name}</div>
                  <div className={styles.price}>${item.price}</div>
                </div>
              </Link>
            </div>
          );
        else if (item.rep) {
          return (<ProductCard data={item.repeat}/>);
        }
      })}
    </div>
  );
}
