"use client";

import styles from "../checkout.module.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { AddressFormData } from "../../../interfaces/index";

const provinciasFetch = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });

export default function AddressForm() {
  const { data: provincias } = useSWR(
    "https://apis.datos.gob.ar/georef/api/provincias",
    provinciasFetch
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>();

  const onSend = async (data: AddressFormData) => {
    console.log(data);
  };

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
                  })}
                />
                <div className={styles.error}>{errors.Name.message}</div>
              </>
            ) : (
              <input
                type="text"
                className={styles.inputField}
                {...register("Name", {
                  required: "Complete su nombre",
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
                  })}
                />
                <div className={styles.error}>{errors.Surname.message}</div>
              </>
            ) : (
              <input
                type="text"
                className={styles.inputField}
                {...register("Surname", {
                  required: "Complete su apellido",
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
                  required: "Complete su teléfono",
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                })}     
              />
              <div className={styles.error}>{errors.Phone.message}</div>
            </>
          ) : (
            <input
              type="phone"
              className={styles.inputField}
              {...register("Phone", {
                required: "Complete su teléfono",
                pattern:
                  {value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,message:'Uso un formato adecuado para el celular'}
              })}
            />
          )}
        </div>
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
                  return <option value={item.nombre}>{item.nombre}</option>;
                })}
              </select>
              <div className={styles.error}>{errors.Province.message}</div>
            </>
          ) : (
            <select
              id="state"
              className={styles.inputField}
              {...register("Province", {
                required: "Agregue una provincia",
              })}
            >
              {provincias?.provincias.map((item: any) => {
                return <option value={item.nombre}>{item.nombre}</option>;
              })}
            </select>
          )}
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
              })}
            />
            <div className={styles.error}>{errors.Street.message}</div>
    </>
  ) : (
    <input
              type="text"
              className={styles.inputField}
              {...register("Street", {
                required: "Agregue una calle",
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
    })}
  />
      <div className={styles.error}>{errors.Direction.message}</div>
    </>
  ) : (
    <input
              type="number"
              className={styles.inputField}
              {...register("Direction", {
                required: "Agregue una altura",
              })}
            />
  )}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label>Departamento </label>
          <input
            type="text"
            className={styles.inputField}
            {...register("Department")}
            placeholder="Opcional"
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Instrucciones </label>
          <input
            type="textarea"
            className={styles.inputField}
            {...register("Instructions")}
            placeholder="Opcional"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
