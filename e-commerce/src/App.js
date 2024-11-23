import logo from './logo.svg';
import './App.css';
import Navigation from './customer/components/navigation/Navigation';
import HomePage from './pages/homePage/HomePage';
import ProductDetails from './customer/components/productDetails/ProductDetails';
import Cart from './customer/components/cart/Cart';
import CheckOut from './customer/components/checkOut/CheckOut';
import Order from './customer/components/order/Order';
import OrderDetails from './customer/components/order/OrderDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerRouters from './routes/CustomerRouters';

function App() {
  return (
    <div >
        <Navigation />
        <Routes>
          <Route path="/*" element={<CustomerRouters />}></Route>
        </Routes>
    </div>
  );
}

export default App;
