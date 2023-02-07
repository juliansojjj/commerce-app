"use client";

import { useAuthContext } from "../Context/AuthStore";
import styles from "./checkout.module.css";
import useSWR from "swr";
import { useState, Suspense } from "react";
import axios from "axios";
import clsx from "clsx";

import { Be_Vietnam_Pro } from "@next/font/google";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircleRounded";
import Link from "next/link";
import AddressesSkeleton from "../components/checkout/addressesSkeleton";

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const addressesFetch = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });

export default function Checkout() {
  const { user } = useAuthContext();
  const { data, mutate } = useSWR(
    `http://localhost:8000/api/checkout/address/${user?.id}`,
    addressesFetch,
    { suspense: true }
  );
  const [addressLocation, setAddressLocation] = useState(0);
  const [sendOption, setSendOption] = useState< | 'domicilio'
                                                | 'local'
                                                | 'sucursal'>('domicilio');

  const deleteAddress = async (addressId: number) => {
    await axios
      .delete(`http://localhost:8000/api/checkout/address/${addressId}`)
      .then(() => setAddressLocation(0))
      .catch((err) => console.log(err));
  };

  const mutateDeleteAddress = async (addressId: number) => {
    mutate(deleteAddress(addressId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>
            <h2>Tus direcciones</h2>
            <Suspense fallback={<AddressesSkeleton />}>
            <div className={styles.multipleAddressContainer}>
                {data?.address.map((item: any, i: any) => {
                if (addressLocation === i) {
                    return (
                    <div className={styles.currentAddressContainer} key={item.id}>
                        <div>
                        <div>{item.province}</div>
                        <div>
                            {item.street} {item.number}
                        </div>
                        </div>
                        <div>
                        <div>{item.name_surname}</div>
                        <div>{item.phone}</div>
                        </div>
                        <div className={styles.filledCircle}>
                        <CircleIcon />
                        </div>
                        <div className={styles.currentIconsContainer}>
                        <Link href={`/checkout/address?edit=${item.id}`}>
                            <EditIcon />
                        </Link>
                        <div onClick={() => mutateDeleteAddress(item.id)}>
                            <DeleteIcon />
                        </div>
                        </div>
                    </div>
                    );
                }
                return (
                    <div
                    className={styles.addressContainer}
                    onClick={() => setAddressLocation(i)}
                    key={item.id}
                    >
                    <div>
                        <div>{item.province}</div>
                        <div>
                        {item.street} {item.number}
                        </div>
                    </div>
                    <div>
                        <div>{item.name_surname}</div>
                        <div>{item.phone}</div>
                    </div>
                    <div className={styles.outlineCircle}>
                        <CircleOutlinedIcon />
                    </div>
                    <div className={styles.iconsContainer}>
                        <Link href={`/checkout/address?edit=${item.id}`}>
                        <EditIcon />
                        </Link>
                        <div onClick={() => mutateDeleteAddress(item.id)}>
                        <DeleteIcon />
                        </div>
                    </div>
                    </div>
                );
                })}
                {data?.address.length === 0 ? (
                <div className={styles.emptyAdvice}>
                    No hay direcciones todavía
                </div>
                ) : (
                ""
                )}
                {data?.address.length < 3 ? (
                <Link
                    href="/checkout/address"
                    className={clsx(styles.addAddressBtn, vietnamPro.className)}
                >
                    <AddCircleIcon />
                </Link>
                ) : (
                ""
                )}
            </div>
            </Suspense>
            <h2>Formas de envío</h2>
            <div className={styles.multipleOptionsContainer}>
                <div 
                className={clsx(
                    {[styles.optionContainer] : sendOption !== 'domicilio'},
                    {[styles.currentOptionContainer] : sendOption == 'domicilio'})}
                onClick={() => setSendOption('domicilio')}
                >
                    <div>Envío a domicilio</div>
                    <div><b>*fetch $ api*</b></div>
                    <div>3-6 días</div>
                    <div className={styles.filledCircle}>
                        <CircleIcon />
                    </div>
                </div>

                <div 
                className={clsx(
                    {[styles.optionContainer] : sendOption !== 'sucursal'},
                    {[styles.currentOptionContainer] : sendOption == 'sucursal'})}
                onClick={() => setSendOption('sucursal')}
                >
                    <div>Envío a sucursal</div>
                    <div><b>*fetch $ api*</b></div>
                    <div>3-6 días</div>
                    <div className={styles.filledCircle}>
                        <CircleIcon />
                    </div>
                </div>

                <div 
                className={clsx(
                    {[styles.optionContainer] : sendOption !== 'local'},
                    {[styles.currentOptionContainer] : sendOption == 'local'})}
                onClick={() => setSendOption('local')}
                >
                    <div>Retiro por local</div>
                    <div><b>Gratis</b></div>
                    <div>9:00-18:00hs<br/>Lun-Vier</div>
                    <div className={styles.filledCircle}>
                        <CircleIcon />
                    </div>
                </div>
            </div>
            
        </div>
        <div>
            <div>ACÁ VISTA DEL CARRITO</div>
            <div>descuento?</div>
            <div>total</div>
            <div>
                <div>mercado pago</div>
                <div>efectivo</div>
                <div>tarjeta</div>
            </div>
            <button>PAGAR</button>
        </div>
      </div>
    </div>
  );
}
