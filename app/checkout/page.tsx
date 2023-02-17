"use client";

import { useAuthContext } from "../Context/AuthStore";
import styles from "./checkout.module.css";
import useSWR from "swr";
import { useState, Suspense, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddressesSkeleton from "../components/checkout/addressesSkeleton";
import MenuCart from "../components/cart/MenuCart";
import { useCartContext } from "../Context/cart/CartStore";
import { nanoid } from "nanoid";

import { Be_Vietnam_Pro } from "@next/font/google";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircleRounded";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import CashIcon from "@mui/icons-material/MonetizationOnOutlined";
import BankIcon from "@mui/icons-material/AccountBalanceOutlined";
import AlertIcon from '@mui/icons-material/PriorityHighRounded';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const addressesFetch = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });

export default function Checkout() {
  const router = useRouter()
  const { user } = useAuthContext();
  const { data, mutate } = useSWR(
    `http://localhost:8000/api/checkout/address/${user?.id}`,
    addressesFetch,
    { suspense: true }
  );
  const [addressLocation, setAddressLocation] = useState(0);
  const [sendOption, setSendOption] = useState<
    "domicilio" | "local" | "sucursal"
  >("domicilio");
  const [postalCode, setPostalCode] = useState("");
  const [sendPrice, setSendPrice] = useState(0);
  const [paymentOption, setPaymentOption] = useState<
    "pagofacil-rapipago" 
    | "transferencia-deposito" 
    | "efectivo" 
    | "mercadopago" 
    | "tarjeta" 
    | 0
  >(0);
  const [alert,setAlert] = useState('');
  const { items, removeProduct, wipeCart } = useCartContext();
  let subtotal: number = 0;

  if (items) {
    items.forEach((unit: any) => {
      subtotal += unit.product.price * unit.amount;
    });
  }

  const deleteAddress = async (addressId: number) => {
    await axios
      .delete(`http://localhost:8000/api/checkout/address/${addressId}`)
      .then(() => setAddressLocation(0))
      .catch((err) => console.log(err));
  };

  const mutateDeleteAddress = async (addressId: number) => {
    mutate(deleteAddress(addressId));
  };

  useEffect(() => {
    if (addressLocation) {
      if (postalCode && sendOption !== "local") {
        fetchSendPrice();
        
      }
      else{
        setTimeout(() => {
            setSendPrice(0);
          }, 1000);
      }
    }
  }, [postalCode, sendOption]);

  useEffect(() => {
    if(items?.length! == 0){
      router.push('/shop');
    }
  }, [items])
  

  const fetchSendPrice = async () => {
    setTimeout(() => {
      // api de correo argentino o distribuidor del local
      const price = parseInt(postalCode) + 150;
      setSendPrice(price);
    }, 1000);
  };
  
  const handleOrder = async()=>{
    if(addressLocation && paymentOption){
              const orderId = nanoid(10)
              const userCart:{}[] = []
              items?.map(unit=>{
                userCart.push({amount:unit.amount,productId:unit.product.id})
              })
              console.log(orderId)
              await axios.post(`http://localhost:8000/api/checkout/order/after/${user?.id}`,{
                id: orderId,
                payment_option:paymentOption,
                send_option:sendOption,
                address_id:addressLocation,
                items:userCart
              })
              .then(res=>{
                if( paymentOption == 'efectivo' || 
            paymentOption == 'transferencia-deposito' || 
            paymentOption == 'pagofacil-rapipago'){
              router.push(`/order/${res.data.order.id}`);
              console.log(res)
            }else if( paymentOption == 'mercadopago'){
              //llamado a servicio de pago de mercadopago
              router.push(`/payment?p=mercadopago&id=${res.data.order.id}`);
            }else{
              //llamado a servicio de pago
              router.push(`/payment?p=tarjeta&id=${res.data.order.id}`)
            }
              })
              .catch(err=>{throw new Error(err)})
    }
    else{
        setAlert('Seleccione todos los campos');
        setTimeout(() => {
            setAlert('');
        }, 4000);
    }
  }

  return (
    <div className={styles.container}>
        {alert 
        ? 
        <div className={styles.alert}><AlertIcon/> {alert}</div> 
        : ''}
      <div className={styles.info}>
        <div>
          <h2>Tus direcciones</h2>
          <Suspense fallback={<AddressesSkeleton />}>
            <div className={styles.multipleAddressContainer}>
              {data?.address.map((item: any, i: any) => {
                if (addressLocation === item.id) {
                  return (
                    <div
                      className={styles.currentAddressContainer}
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
                    onClick={() => {
                      setAddressLocation(item.id);
                      setPostalCode(item.postal_code);
                    }}
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
        </div>
        <div>
          <h2>Detalles del carrito</h2>
          <div className={styles.details}>
            <MenuCart checkout="TRUE" />
            <div className={styles.pricesContainer}>
              {subtotal ? (
                <>
                  <div>Items: </div>
                  <div>${subtotal}</div>
                </>
              ) : (
                ""
              )}
              <div>Envío: </div>
              <div>${sendPrice}</div>
              <div className={styles.priceTotal}>Total: </div>
              <div className={styles.priceTotal}>${sendPrice + subtotal}</div>
            </div>
          </div>
        </div>
        <div>
          <h2>Formas de envío</h2>
          <div className={styles.multipleOptionsContainer}>
            <div
              className={clsx(
                { [styles.optionContainer]: sendOption !== "domicilio" },
                { [styles.currentOptionContainer]: sendOption == "domicilio" }
              )}
              onClick={() => setSendOption("domicilio")}
            >
              <div>Envío a domicilio</div>
              <div>
                <b>*fetch $ api*</b>
              </div>
              <div>3-6 días</div>
              <div className={styles.filledCircle}>
                {sendOption == "domicilio" ? (
                  <CircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
              </div>
            </div>

            <div
              className={clsx(
                { [styles.optionContainer]: sendOption !== "sucursal" },
                { [styles.currentOptionContainer]: sendOption == "sucursal" }
              )}
              onClick={() => setSendOption("sucursal")}
            >
              <div>Envío a sucursal</div>
              <div>
                <b>*fetch $ api*</b>
              </div>
              <div>3-6 días</div>
              <div className={styles.filledCircle}>
                {sendOption == "sucursal" ? (
                  <CircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
              </div>
            </div>

            <div
              className={clsx(
                { [styles.optionContainer]: sendOption !== "local" },
                { [styles.currentOptionContainer]: sendOption == "local" }
              )}
              onClick={() => setSendOption("local")}
            >
              <div>Retiro por local</div>
              <div>
                <b>Gratis</b>
              </div>
              <div>
                9:00-18:00hs
                <br />
                Lun-Vier
              </div>
              <div className={styles.filledCircle}>
                {sendOption == "local" ? (
                  <CircleIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Medios de pago</h2>
          <div className={styles.payment}>
            <div
              className={clsx(styles.paymentOption,
                { [styles.currentPaymentOption]: paymentOption == "pagofacil-rapipago" }
              )}
              onClick={() => setPaymentOption("pagofacil-rapipago")}
            >
              <div className={styles.filledCircle}>
                {paymentOption == "pagofacil-rapipago" 
                ? 
                <CircleIcon/>
                :
                <CircleOutlinedIcon />}
                </div>
              <div>
                <img
                  src="https://www.pagofacil.com.ar/images_estaticas/PagoFacil_LOGO_Cuadrado.svg?1675898352"
                  alt=""
                  className={styles.paymentImg}
                />
                <img
                  src="https://rapipago.com.ar/rapipagoWeb/assets/img/logo_blanco.png"
                  alt=""
                  className={styles.paymentImgNoBg}
                />
              </div>
              <span>Pago fácil o Rapipago</span>
            </div>
            <div className={clsx(styles.paymentOption,
                { [styles.currentPaymentOption]: paymentOption == "transferencia-deposito" }
              )}
                onClick={() => setPaymentOption("transferencia-deposito")}
            >
              <div className={styles.filledCircle}>
                {paymentOption == "transferencia-deposito" 
                ? 
                <CircleIcon/>
                :
                <CircleOutlinedIcon />}
                </div>
              <div className={styles.paymentImgContainer}>
                <BankIcon />
              </div>

              <span>Transferencia o depósito bancario</span>
            </div>
            <div className={clsx(styles.paymentOption,
                { [styles.currentPaymentOption]: paymentOption == "efectivo" }
              )}
                onClick={() => setPaymentOption("efectivo")}
            >
              <div className={styles.filledCircle}>
                {paymentOption == "efectivo" 
                ? 
                <CircleIcon/>
                :
                <CircleOutlinedIcon />}
                </div>
              <div className={styles.paymentImgContainer}>
                <CashIcon />
              </div>

              <span>Efectivo (en local)</span>
            </div>
            <div className={clsx(styles.paymentOption,
                { [styles.currentPaymentOption]: paymentOption == "mercadopago" }
              )}
                onClick={() => setPaymentOption("mercadopago")}
            >
              <div className={styles.filledCircle}>
                {paymentOption == "mercadopago" 
                ? 
                <CircleIcon/>
                :
                <CircleOutlinedIcon />}
                </div>
              <div className={styles.paymentImgContainer}>
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/5/5c/MercadoPago.svg/"
                  alt=""
                  className={styles.paymentImg}
                />
              </div>
              <span>Mercado Pago</span>
            </div>
            <div className={clsx(styles.paymentOption,
                { [styles.currentPaymentOption]: paymentOption == "tarjeta" }
              )}
                onClick={() => setPaymentOption("tarjeta")}
            >
                <div className={styles.filledCircle}>
                {paymentOption == "tarjeta" 
                ? 
                <CircleIcon/>
                :
                <CircleOutlinedIcon />}
                </div>
              
              <div className={styles.paymentImgContainer}>
                <CreditCardIcon />
              </div>

              <span>Tarjeta de crédito/debito</span>
            </div>
            <div className={styles.buttonContainer}
                onClick={handleOrder}>
                <button className={clsx(styles.submitButton, vietnamPro.className)}>
                Pagar
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
MEDIOS DE PAGO:
A posteriori:
    - pagofacil/rapipago
    - transferencia bancaria/deposito
    - efectivo(en local)
A priori:
    - mercado pago
    - tarjeta crédito/débito

En ambos casos, antes de proceder a crear la orden o al pago
Debe comprobar haciendo un fecth la sumatoria de los precios y los productos desde la db

*/
