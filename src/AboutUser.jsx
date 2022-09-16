import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminDashboard";

function AboutUser() {

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState({});
    const [cartData, setCart] = React.useState([{}]);
    const [tokens, setToken] = React.useState();


    const callAboutUser = async () => {
        try {

            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "api/users/aboutuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

            });
            const data = await res.json();
            setUserData(data);
            setUserData((state) => {
                return state;
            });
            console.log(data.history);
            setCart(data.history);
            setCart((state) => {
                return state;
            });

            navigate("/aboutuser");


            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
            navigate("/login");
        }
    }

    const deleteProduct = async (prodId) => {

        setCart(cartData.filter(ele => {
            return ele.id !== prodId;
        })
        );

        const product = {
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
                process.env.REACT_APP_BACKEND_URL + "api/users/cart/product/delete", product, config
            );

        } catch (error) {
            console.log(error.response.data);
        }
    };


    function create(items) {
        return (
            <div class="row rounded-0">
                <div class="col-4">

                    {<Link to={`/productlanding/${items.id}`}><img class="cart-img rounded-0" alt="..." src={items.image} /></Link>}
                    <div class="text-start" style={{ marginLeft: '9rem', fontFamily: 'Montserrat', padding: '1rem' }}>
                        <h4 >{items.name}</h4>
                        <p style={{ color: "red" }}>₹{items.price} </p>
                    </div>
                </div>
                <div class="col-4" style={{ fontFamily: 'Montserrat', padding: '1rem' }}>
                    <p>{items.bought}</p>
                </div>
                <div class="col-4" style={{ fontFamily: 'Montserrat', padding: '1rem' }}>
                    <p style={{ float: "left" }}>₹{items.price * items.bought}</p>

                    <p class="text-end"><button onClick={() => deleteProduct(items.id)} type="button" style={{ border: "none", color: "white" }}><i class="fa-solid fa-trash"></i></button></p>
                </div>
            </div>

        );
    };



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setToken(user.token);
        }
        callAboutUser();
    }, []);



    return (
        <div>
            <Header />

            <div >
                <div class="container profile-container">
                    {userData.role === 1 ? <h1 style={{ fontSize: "30px", fontFamily: 'Montserrat', fontWeight: "600", marginLeft: "2rem" }}>ADMIN</h1> : ""}
                    <h1 style={{ fontSize: "40px", fontFamily: 'Montserrat', fontWeight: "600", float: "left", marginLeft: "2rem" }}>Personal Information</h1>

                    <div class="text-start profile-details">
                        <h4> <strong>Name: </strong> {userData.name} </h4>
                        <h4> <strong>Email: </strong>  {userData.email}</h4>

                    </div>
                </div>

                {userData.role === 1 ?
                    <>
                        <Admin data={userData} />

                    </>
                    :
                    <>


                        <div class="container profile-container">

                            <h1 style={{ fontSize: "40px", fontFamily: 'Montserrat', fontWeight: "600", marginLeft: "2rem", paddingBottom: "3rem" }}>Cart</h1>
                            <div class="container" style={{ paddingLeft: "8rem", paddingRight: "8rem" }}>

                                {Object.keys(cartData).length !== 0 ?

                                    <>
                                        <div class="row cart" style={{ marginLeft: "0.5rem" }}>
                                            <div class="col-4">
                                                <h4>Product</h4>
                                            </div>
                                            <div class="col-4">
                                                <h4>Quantity</h4>
                                            </div>
                                            <div class="col-4">
                                                <h4>Amount</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            {cartData.map(create)};
                                        </div>
                                        <div > <hr class="h-line" width="40%" /></div>
                                        <div class="row">
                                            <div class="col-4"></div>
                                            <div class="col-4"><h4>Total</h4></div>
                                            <div class="col-4" style={{ color: "red" }} >
                                                <h6>₹ {cartData.reduce((total, item) => total + (item.price * item.bought), 0)}</h6>
                                                <Link to="/checkout"><button type="button" class="btn rounded-0" style={{ margin: "1rem 0 0 0 ", backgroundColor: "#14274f", color: "white" }}><h6>CHECKOUT</h6></button></Link>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div class="text-center">
                                            <img class="emptycart-img" alt="..." src={process.env.PUBLIC_URL + '/images/emptycart.jpg'} />
                                            <br />
                                            <strong>There is nothing in your cart</strong>
                                            <p>Let's add some items</p>
                                            <Link to="/shop"><button type="button" class="btn btn-outline-dark btn-lg rounded-0" ><h6>ADD ITEMS FROM SHOP</h6></button></Link>
                                        </div>

                                    </>
                                }

                            </div>
                        </div>
                    </>
                }



            </div>


            <Footer />
        </div>
    );
}

export default AboutUser;