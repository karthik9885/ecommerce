import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/homePage/HomePage'
import Cart from '../customer/components/cart/Cart'
import ProductDetails from '../customer/components/productDetails/ProductDetails'
import CheckOut from '../customer/components/checkOut/CheckOut'
import Order from '../customer/components/order/Order'
import OrderDetails from '../customer/components/order/OrderDetails'
import Product from '../customer/components/product/Product'
import ItemDetails from '../customer/components/homeSectionCard/ItemDetails'

const CustomerRouters = () => {
  return (
    <div>
        <div>
          
            <Routes>
                <Route path="/login" element={<HomePage />}></Route>
                <Route path="/register" element={<HomePage />}></Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />}></Route>
                <Route path="/product/:productId" element={<ProductDetails />}></Route>
                <Route path="/checkout" element={<CheckOut />}></Route>
                <Route path="/account/order" element={<Order />}></Route>
                <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
                <Route path="/product/details/:id" element={<ItemDetails />}></Route>
            </Routes>
        </div>
    </div>
  )
}

export default CustomerRouters