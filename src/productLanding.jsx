import React, { useEffect, useState,} from "react";
import Header from "./Header"
import Footer from "./Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

function ProductLanding(props) {

    const navigate = useNavigate();
    const param = useParams();
    const productId = param.productId;

    const [productData, setProductData] = useState([{}]);
    const [quantity,setQuantity] = useState(1);
    const [tokens,setToken] = React.useState();

    const selectedProduct = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+`api/users/product/products_by_id?id=${productId}`);
            const product = res.data;

            setProductData(product.data);

            setProductData((state) => {
                return state;
            });

            if (!res.status === 200) {
                throw new Error(res.error);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const submitProduct=async(event)=>{
        event.preventDefault();
        const cart={
            id: productData[0]._id,
            name: productData[0].name,
            price:productData[0].price,
            quantity:productData[0].quantity,
            bought:quantity,
            token:tokens,
            image:productData[0].image
        }
        console.log(cart);
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                }
            };
           
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/product/cart",cart,config
            );
      
            window.alert("Product has been added to cart");
      
        } catch (error) {
            navigate("/login");
            console.log(error.response.data);
            
        }
    };

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
         setToken(user.token);
        }
        selectedProduct();
    }, []);


    const productName = String(productData[0].name);
    const capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    console.log(quantity);

    return (
        <div>
            <Header />

            <div class="container">
                <div class="product-container" >

                    <img class="signinImg" alt="selected product" src={productData[0].image} />

                    <div class="signin-text text-start" >
                        <h1 >{capitalize(productName)}</h1>
                        <hr width="20%" style={{ height: "1rem" }}></hr>
                        <h5 >₹ {productData[0].price}</h5>
                        <p style={{ padding: "1rem 0 0 0 " }} >{productData[0].description} </p>
                        
                        <form>
                            
                        <label style={{display: "inline-block", width: "13rem"}}><h5>Quantity</h5></label>
                        <input style={{width:"5rem"}} type="number" placeholder="1" onChange={(e) => setQuantity(e.target.value)} name="quantity"/>
                        <br />
                        <button onClick={submitProduct} type="button" style={{ margin: "2rem 0 0 0 " }} class="btn btn-outline-dark btn-lg rounded-0"><h4>ADD TO CART</h4></button>
                        </form>
                    </div>

                </div>
            </div>




            <Footer />

        </div >
    );
}

export default ProductLanding;