import React, { useEffect } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import Home from './home/Home';
import AboutUser from './AboutUser';
import Category from "./Category"
import Product from './Products';
import Shop from './Shop';
import ShopCategory from './ShopCategories';
import ProductLanding from './productLanding';
import ProductChange from './deleteUpdateProduct';
import ProductUpdate from './ProductUpdate';
import Orders from './Checkout';
import ViewOrders from './ViewOrders';


function App(){
    useEffect(() => {
        document.title = "The fashion store"
      }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/shop" element={<Shop/>} />
                <Route exact path="/shopcategory" element={<ShopCategory/>} />
                <Route exact path="/aboutuser" element={<AboutUser/>} />
                <Route exact path="/logout" element={<Logout/>} />
                <Route exact path="/category" element={<Category/>} />
                <Route exact path="/checkout" element={<Orders/>} />
                <Route exact path="/product" element={<Product/>} />
                <Route exact path="/vieworders" element={<ViewOrders/>} />
                <Route exact path="/productchange" element={<ProductChange/>} />
                <Route exact path="/productlanding/:productId" element={<ProductLanding/>} />
                <Route exact path="/productupdate/:productId" element={<ProductUpdate/>} />
            </Routes>
            
        </BrowserRouter>
    );
};

export default App;

