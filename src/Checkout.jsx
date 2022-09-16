import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function Orders() {

    const [userData, setUserData] = React.useState([]);
    const [cartData, setCart] = React.useState([{}]);
    const [tokens, setToken] = React.useState();
    const [details, setDetails] = React.useState({
        fullname:"",
        mobile:"",
        address:"",
        city:"",
        state:"",
        pincode:"" 
    });


    const callAboutUser = async () => {
        try {

            const res = await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/aboutuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: "include",
                
            });
            const data = await res.json();
            setUserData(oldArray => [...oldArray,data]);
            setUserData((state) => {
                return state;
            });
            setCart(data.history);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleChange(event){
        const {name,value} = event.target;
        setDetails((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

    const submitProduct=async(event)=>{
        event.preventDefault();
        const order={
            token: tokens,
            fullname:details.fullname,
            mobile:details.mobile,
            address:details.address,
            city:details.city,
            state:details.state,
            pincode:details.pincode,
            user:userData,
            items:cartData,
        }
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                }
            };
           
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/order/addorder",order,config
            );
      
            window.alert("order has been placed.");
      
        } catch (error) {
            console.log(error.response.data);
            
        }
    };

    function create(items){
        return(
            <p>{items.name}<span class="price">₹{items.price * items.bought}</span></p>
        )
    }
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
            <div class="container">
            <div class="order_row" style={{margin:"3rem 1rem"}}>
                <div class="col-75">
                    <div class="order_container">
                        <form>

                            <div class="order_row">
                                <div class="col-50">
                                    <h1>Billing Details</h1>  
                                    <label ><i class="fa fa-user"></i> Full Name</label>
                                    <input type="text" onChange={handleChange} value={details.fullname} id="fname" name="fullname" />
                                    <label ><i class="fa-solid fa-mobile-screen"></i> Mobile No.</label>
                                    <input type="text" onChange={handleChange} value={details.mobile} id="mobile" name="mobile" />
                                    <label ><i class="fa fa-address-card-o"></i> Address</label>
                                    <input type="text" onChange={handleChange} value={details.address} id="adr" name="address" />
                                    <label ><i class="fa fa-institution"></i> City</label>
                                    <input type="text" onChange={handleChange} value={details.city} id="city" name="city"/>

                                    <div class="order_row">
                                        <div class="col-50">
                                            <label>State</label>
                                            <input type="text" onChange={handleChange} value={details.state} id="state" name="state" />
                                        </div>
                                        <div class="col-50">
                                            <label >Pincode</label>
                                            <input type="text" onChange={handleChange} value={details.pincode} id="pincode" name="pincode"/>
                                        </div>
                                    </div>

                                </div>



                            </div>
                            <p>We accept only cash on delivery orders</p>
                            <button onClick={submitProduct} type="button" class="order_btn">PLACE ORDER</button>
                        </form>
                    </div>
                </div>

                <div class="col-25">
                    <div class="order_container">
                        <h4>Cart
                            <span class="price" style={{ color: "black" }}>
                                <i class="fa fa-shopping-cart"></i>
                                <b>{Object.keys(cartData).length}</b>
                            </span>
                        </h4>

                        {cartData.map(create)}
                        <hr />
                        <p>Total <span class="price" style={{ color: "black" }}><b>₹ {cartData.reduce((total, item) => total + (item.price * item.bought), 0)}</b></span></p>
                    </div>
                </div>
            </div>
            </div>
            {/* <h1>{userData[0].name}</h1> */}
            <Footer />
        </div>
    );
}

export default Orders;