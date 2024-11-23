import { useDispatch } from "react-redux"
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS } from "./ActionType";
import { api } from "../../config/ApiConfig";


export const findProducts =(reqData) =>  async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST})
    const {colors,sizes,minPrice,maxPrice,minDiscount,category,stock,sort,pageNumber,pageSize}=reqData;

    try{
        const categoryTrimmed = category.replace('}', '');
        const {data} = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${categoryTrimmed}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        console.log("product data in find products", data);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    }
}


export const findProductsById =(reqData) =>  async(dispatch)=>{
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    console.log("reqdata",reqData)
    const productId = reqData.productId.replace(/[{}]/g, '');
    // const { productId }= reqData;
    console.log("productId",productId)
    try{
        const { data } = await api.get(`/api/products/id/${productId}`)
        console.log("returned data from api",data)
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}