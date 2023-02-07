import { ReactNode } from "react";


// auth
export type User = {
    id:number;
    name:string;
    email:string;
    role:string;
}

export type AuthContextProps = {
    isLoggedIn: boolean;
    user?: User;
    login:(user:User)=>void
    logout:()=>void
}

export type AuthState = {
    isLoggedIn: boolean;
    user?: User;
    
}

export interface ProviderProps {
    children:ReactNode
}

export interface Children extends ProviderProps{};

export interface AuthProps extends ProviderProps{
    session?:any
}

export type Credentials = {
    email: string;
    password: string;
    redirect: boolean;
    csrfToken: string;
    callbackUrl: string;
    json: boolean;
  }

// -------------

export type Product = {
    id: number;
    name:string;
    description:string;
    price:number;
    stock:number;
    type:string;
    measures:string;
    image:string;
    createdAt?:string;
    updatedAt?:string;
    serialNumber:string | number;
}

// Cart 

export type Item = {
    amount:number;
    product:Product;
}
export type InitialCartItem = {
    amount:number;
    product?:Product;
}

export type CartState = {
    items?:Item[];
}

export type CartContextProps = {
    items?:Item[];
    addProduct:     ({ amount, product }: Item) => void;
    removeProduct:  (product: Product) => void;
    increaseAmount: ({ amount, product }: Item) => void;
    decreaseAmount: ({ amount, product }: Item) => void;
}

//FORMS
export type SignInFormData = {
    email: string;
    password: string;
}

export type AddressFormData = {
    Name_Surname:string;
    Phone:string;
    Province:string;
    Postal_Code:string;
    Street:string;
    Direction:Number;
    Department?:string;
    Note?:string;
    
    Name?:string;
    Surname?:string;
}