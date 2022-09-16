import React, { useEffect,useState } from "react";
import Header from "./Header"
import {ChangeProduct } from "./Cards";
import Footer from "./Footer";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Input } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

function ProductChange() {

    const navigate=useNavigate();
  
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([{}]);
    const [tokens, setToken] = React.useState();
    const [productData,setProducts] =  React.useState([{}]);

    const authAdmin = async () => {
        try {

            const res = await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/authadmin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                
            });
            const data = await res.json();

            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
            navigate("/login");
        }
    }

    const allProducts = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/users/shop");
            const products=res.data;
            
            setProducts(products.data);
            if(!res.status===200){
                throw new Error(res.error);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (prodId) => {
        
        setProducts(productData.filter(ele => {
            return ele._id !== prodId;
        })
        );
        setFilteredResults(filteredResults.filter(ele => {
            return ele._id !== prodId;
        })
        );
        const delProduct = {
            id: prodId,
            token: tokens
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/product/delete", delProduct, config
            );

        } catch (error) {
            console.log(error.response.data);
        }
    };

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = productData.filter((item) => {
                return Object.values(item)[1].toLowerCase().includes(searchInput.toLowerCase());
            })
            setFilteredResults(filteredData);
        }
        else{
            setFilteredResults(productData);
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setToken(user.token);
        }
        allProducts();
        authAdmin();
    }, []);

    function create(items) {
        return (
            <div class="col-lg-3 col-md-6">
                <ChangeProduct id={items._id} image={items.image}  name={items.name} price={items.price} key={items._id} clickDelete={() => deleteProduct(items._id)} />
                
            </div>
        );
    };

    return (
        <div>
            <Header />

            <div class="text-center" style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...' 
                onChange={(e) => searchItems(e.target.value)}
            />
            </div>

            <div class="container p-5">
                <div class="row">
                    {searchInput.length >1 ? 
                    (filteredResults.map(create)): (productData.map(create))}
                </div>
            </div>


   

            <Footer />

        </div>
    );
}

export default ProductChange;