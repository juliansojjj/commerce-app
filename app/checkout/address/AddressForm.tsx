"use client";

import styles from "../checkout.module.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { AddressFormData } from "../../../interfaces/index";
import clsx from "clsx";
import { useAuthContext } from "../../Context/AuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Be_Vietnam_Pro } from "@next/font/google";

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const multipleFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });

const oldValuesFetch = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });

export default function AddressForm({edit}:{edit:string}) {
  const router = useRouter();
  const { data: oldValues } = useSWR(
    `http://localhost:8000/api/checkout/address/old/${edit}`,
    multipleFetcher
    );
    const { data: provincias } = useSWR(
      "https://apis.datos.gob.ar/georef/api/provincias",
      multipleFetcher
      );
      const { user } = useAuthContext();
      
      const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm<AddressFormData>();
      
      const onSend = async (data: AddressFormData) => {
        if(!edit){
        const newAddress = {
          user_id: user?.id,
          name_surname: `${data.Name} ${data.Surname}`,
          phone: data.Phone,
          province: data.Province,
          postal_code:data.Postal_Code,
          street: data.Street,
          number: data.Direction,
          department: data.Department,
          note: data.Note,
        };
        console.log(newAddress);
        await axios
      .post("http://localhost:8000/api/checkout/address", newAddress)
      .then(() => router.push("/checkout"))
      .catch((err) => console.log(err));
      }
      else{
        const newAddress = {
          user_id: user?.id,
          name_surname: `${data.Name} ${data.Surname}`,
          phone: data.Phone,
          province: data.Province,
          postal_code:data.Postal_Code,
          street: data.Street,
          number: data.Direction,
          department: data.Department,
          note: data.Note,
        };
        console.log(newAddress);
        await axios
      .put(`http://localhost:8000/api/checkout/address/${edit}`, newAddress)
      .then(() => {
        reset();
        router.push("/checkout");
      })
      .catch((err) => console.log(err));
      }
    };
    
  useEffect(()=>{
    reset();
    const name = oldValues?.address.name_surname.split(' ')[0]
    const surname = oldValues?.address.name_surname.split(' ')[1]

    setValue('Name',name)
    setValue('Surname',surname)
    setValue('Phone',oldValues?.address.phone)
    setValue('Province',oldValues?.address.province)
    setValue('Postal_Code',oldValues?.address.postal_code)
    setValue('Street',oldValues?.address.street)
    setValue('Direction',oldValues?.address.number)
    setValue('Department',oldValues?.address.department)
    setValue('Note',oldValues?.address.note)
  },[oldValues?.address])

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSend)}>
        <div className={styles.multipleInputContainer}>
          <div className={styles.inputContainer}>
            <label>Nombre </label>
            {errors.Name ? (
              <>
                <input
                  type="text"
                  className={styles.errorInputField}
                  {...register("Name", {
                    required: "Complete su nombre",
                    maxLength: {
                      value: 30,
                      message: "Excede el límite de caractéres",
                    },
                  })}
                />
                <div className={styles.error}>{errors.Name.message}</div>
              </>
            ) : (
              <input
                type="text"
                className={clsx(styles.inputField, vietnamPro.className)}
                {...register("Name", {
                  required: "Complete su nombre",
                  maxLength: {
                    value: 30,
                    message: "Excede el límite de caractéres",
                  },
                })}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label>Apellido </label>
            {errors.Surname ? (
              <>
                <input
                  type="text"
                  className={styles.errorInputField}
                  {...register("Surname", {
                    required: "Complete su apellido",
                    maxLength: {
                      value: 30,
                      message: "Excede el límite de caractéres",
                    },
                  })}
                />
                <div className={styles.error}>{errors.Surname.message}</div>
              </>
            ) : (
              <input
                type="text"
                className={clsx(styles.inputField, vietnamPro.className)}
                {...register("Surname", {
                  required: "Complete su apellido",
                  maxLength: {
                    value: 30,
                    message: "Excede el límite de caractéres",
                  },
                })}
              />
            )}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Teléfono </label>
          {errors.Phone ? (
            <>
              <input
                type="phone"
                className={styles.errorInputField}
                {...register("Phone", {
                  required: "Use un formato válido e.g: \n 11 0000 0000",
                  pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                })}
              />
              <div className={styles.error}>{errors.Phone.message}</div>
            </>
          ) : (
            <input
              type="phone"
              className={clsx(styles.inputField, vietnamPro.className)}
              {...register("Phone", {
                required: "Use un formato válido e.g: \n 11 0000 0000",
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: "Use un formato adecuado",
                },
              })}
            />
          )}
        </div>
        <div className={styles.multipleInputContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="state">Seleccione su provincia</label>
            {errors.Province ? (
              <>
                <select
                  id="state"
                  className={styles.errorInputField}
                  {...register("Province", {
                    required: "Agregue una provincia",
                  })}
                >
                  {provincias?.provincias.map((item: any) => {
                    return <option value={item.nombre} key={item.nombre}>{item.nombre}</option>;
                  })}
                </select>
                <div className={styles.error}>{errors.Province.message}</div>
              </>
            ) : (
              <select
                id="state"
                className={clsx(styles.inputField, vietnamPro.className)}
                {...register("Province", {
                  required: "Agregue una provincia",
                })}
              >
                {provincias?.provincias.map((item: any) => {
                  return (
                    <option value={item.nombre} key={item.nombre} >
                      {item.nombre}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label>Código postal </label>
            {errors.Postal_Code ? (
              <>
                <input
                  type="text"
                  className={styles.errorInputField}
                  {...register("Postal_Code", {
                    required: "Agregue un código",
                    maxLength: {
                      value: 50,
                      message: "Excede el límite de caractéres",
                    },
                    pattern:{value:/C?[0-9]{4}([A-Za-z]{3})?/i,
                            message:'Ingrese un formato válido'}
                  })}
                />
                <div className={styles.error}>{errors.Postal_Code.message}</div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className={clsx(styles.inputField, vietnamPro.className)}
                  {...register("Postal_Code", {
                    required: "Agregue un código",
                    maxLength: {
                      value: 8,
                      message: "Ingrese un código postal válido",
                    },
                    pattern:{value:/C?[0-9]{4}([A-Za-z]{3})?/i,
                              message:'Ingrese un formato válido'}
                  })}
                />
                <Link href='https://www.correoargentino.com.ar/formularios/cpa'
                  className={styles.errorLink}>
                    ¿Cómo saber mi código postal?
                </Link>
              </>
            )}
          </div>
        </div>

        <div className={styles.multipleInputContainer}>
          <div className={styles.inputContainer}>
            <label>Calle </label>
            {errors.Street ? (
              <>
                <input
                  type="text"
                  className={styles.errorInputField}
                  {...register("Street", {
                    required: "Agregue una calle",
                    maxLength: {
                      value: 50,
                      message: "Excede el límite de caractéres",
                    },
                  })}
                />
                <div className={styles.error}>{errors.Street.message}</div>
              </>
            ) : (
              <input
                type="text"
                className={clsx(styles.inputField, vietnamPro.className)}
                {...register("Street", {
                  required: "Agregue una calle",
                  maxLength: {
                    value: 50,
                    message: "Excede el límite de caractéres",
                  },
                })}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label>Número </label>
            {errors.Direction ? (
              <>
                <input
                  type="number"
                  className={styles.errorInputField}
                  {...register("Direction", {
                    required: "Agregue una altura",
                    maxLength: {
                      value: 5,
                      message: "Excede el límite de caractéres",
                    },
                  })}
                />
                <div className={styles.error}>{errors.Direction.message}</div>
              </>
            ) : (
              <input
                type="number"
                className={clsx(styles.inputField, vietnamPro.className)}
                {...register("Direction", {
                  required: "Agregue una altura",
                  maxLength: {
                    value: 5,
                    message: "Excede el límite de caractéres",
                  },
                })}
              />
            )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Departamento (opcional)</label>
          <input
            type="text"
            className={clsx(styles.inputField, vietnamPro.className)}
            {...register("Department", {
              maxLength: {
                value: 40,
                message: "Excede el límite de caractéres",
              },
            })}
            placeholder="Casa/departamento"
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Nota (opcional)</label>
          <textarea
            className={clsx(styles.textAreaInputField, vietnamPro.className)}
            {...register("Note", {
              maxLength: {
                value: 255,
                message: "El límite es de 255 caracteres",
              },
            })}
            placeholder="Nota o pedido"
          />
          {errors.Note ? (
            <div className={styles.error}>{errors.Note.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={clsx(styles.submitButton, vietnamPro.className)}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
