import axios from "axios";

export const getAllProducts = async()=>{
    const allProducts = await axios
    .get("http://localhost:8080/products/")
    .catch((err)=>{console.log(err)});
    return allProducts.data;
  }
  
  export const getProductById = async()=>{
    const productFound = await axios
    .get("http://localhost:8080/produtcs/")
    .catch((err)=>{console.log(err)});
    return productFound.data;
  }