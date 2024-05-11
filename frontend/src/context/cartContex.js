import {  createContext, useContext, useEffect, useState } from "react";

const CartContex=createContext();

const CartContexProvider=({children})=>{

 const [carts,setCarts]=useState([]);
useEffect(()=>{
   let mycarts=JSON.parse(localStorage.getItem("carts"));
   console.log("Stored carts:", mycarts);
   if(carts){
    
      setCarts(mycarts);
   }
},[]);



 return (
    <CartContex.Provider value={{carts,setCarts}}>
        {children}
    </CartContex.Provider>
 )


}

//customer hooks
const useCart=()=>useContext(CartContex);
export  {useCart,CartContexProvider};