import React, { useEffect } from 'react'
// *redux
import { useDispatch } from "react-redux";
// *locals
import { getAllProducts } from "../../service/ProductService";
import { setProduct } from "../../redux/actions/productActions";
import ProductComponent  from "./ProductComponent/ProductComponent";

function Product() {
    const dispatch = useDispatch();
    const fetchAllProducts =async()=>{
        const allProductsArray = await getAllProducts();
        dispatch(setProduct(allProductsArray));
        console.log(allProductsArray);
    }

    useEffect(() => {
        fetchAllProducts();
        return () => {
        }
    }, [])

    return (
        <div>
                <ProductComponent/>
        </div>
    )
}

export default Product;
