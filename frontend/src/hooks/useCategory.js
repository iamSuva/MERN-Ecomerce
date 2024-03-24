import axios from "axios";
import { useEffect, useState } from "react";


export default function useCategory()
{
    const [categories,setCategories]=useState();

    const getCategories=async()=>{
        try {
            const { data } = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/category/get-allcategory`
            );
            console.log("cat data ",data);
            if (data?.success) {
              setCategories(data?.allcategory);
              // console.log(categories);
            }
          } catch (error) {
            console.log(error);
            // toast.error("Something wwent wrong in getting catgeory");
          }


    }
    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}