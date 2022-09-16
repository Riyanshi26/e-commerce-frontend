import React, { useEffect, useState } from "react";
import Header from "./Header"
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ViewOrders() {
    const navigate=useNavigate();

    const [orderData, setOrders] = useState([]);

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
            window.alert("you are not admin. Please login with admin Id");
            navigate("/login");
        }
    }

    const allOrders = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'api/users/vieworders');
            const orders = res.data;

            setOrders(orders.data);

            setOrders((state) => {
                console.log(orderData);
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

    const delivered = async (orderId) => {

        const order = {
            id: orderId
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/order/delivered",order, config
            );

        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        allOrders();
        authAdmin();
    }, []);
    function create(item) {

        return (
            <div class="row rounded-0">
                <div class="col-9">
                    <div class="text-start" style={{fontFamily: 'Montserrat', padding: '1rem' }}>
                        <div class="row">
                        {item.items.map(i =>
                            
                            <div class="col-3">
                                {<Link to={`/productlanding/${i.id}`}><img style={{float:"left"}} class="cart-img rounded-0" alt="..." src={i.image} /></Link>}
                                <p>{i.name} <br/>
                                ₹{i.price}</p>
                                <p>Quantity: {i.bought}</p>
                            </div>

                        )}
                        </div>
                    </div>
                </div>
                <div class="col-2" style={{ fontFamily: 'Montserrat', padding: '1rem' }}>
                    <p>{item.fullname} </p>
                    <p>{item.mobile} </p>
                    <p>{item.address}</p>
                    <p>{item.city} </p>
                    <p>{item.state}   {item.pincode} </p>
                </div>
                <div class="col-1" style={{padding: '1rem 0' }}>
                    {item.delivered==1? <i class="fa-solid fa-circle-check"></i> : ""}
                    <button onClick={() => delivered(item._id)} type="button" class="btn btn-success">Delivered?</button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div class="container" style={{ margin: "3rem 7rem" }}>


                <div class="row orders" style={{ marginLeft: "0.5rem" }}>
                    <div class="col-10">
                        <h4>Product</h4>
                    </div>
                    <div class="col-2">
                        <h4>Details</h4>
                    </div>
                </div>
                <div class="row">
                    {orderData.map(create)};
                </div>

            </div>

            <Footer />

        </div>
    );
}

export default ViewOrders;