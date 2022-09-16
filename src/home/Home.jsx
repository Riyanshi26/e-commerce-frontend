import React,{useEffect} from "react";
import Header from "../Header"
import HomeCarousel from "./HomeCarousel";
import {Cards} from "../Cards";
import Items from "./HomeDeals";
import Testimonials from "./Testimonial";
import Footer from "../Footer";
function Home() {

    const [userName,setUserName] =  React.useState('');
    const [show,setShow] =  React.useState(false);


    const callAboutUser=async()=>{
        try{
            
            const res=await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/aboutuser",{
                method:"GET",
                headers: {
                "Content-Type":"application/json"
                },
                credentials: "include",
            });
           
            const data=await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);
            setUserName((state) => {
                console.log(state);
                
                return state;
              });

            if(!res.status===200){
                throw new Error(res.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        callAboutUser();
    },[] );



    function create(items){
        return(
            <div class="col-lg-3 col-md-6">
            <Cards id={items.id} image={items.image} name={items.name} price={items.price} oldPrice={items.oldPrice} off={items.off} key={items.id} />
            </div>
        );
    };

    return (
        <div>
            <Header />

            <div >
               
                <h4 class="title-text text-center">{show? `Hello  ${userName} , ENJOY THE SEASON SALE UPTO 80% OFF`:"ENJOY THE SEASON SALE UPTO 80% OFF"}</h4>
            </div>

            <HomeCarousel />

            <div >
                <h2 class="title-text text-center">Favourite Brands And Hottest Trends</h2>
            </div>

            <div class="container p-5">
                <h1>Deals Of The Day</h1>
                <div class="row">
                    {Items.map(create)};
                </div>
            </div>

            <Testimonials />

            <section id="features">
                <div class="row">

                    <div class="feature-box col-lg-3 col-sm-6">
                        <i class="fa-solid fa-truck fa-2x"></i>
                        <h5>Free Shipping</h5>
                    </div>

                    <div class="feature-box col-lg-3 col-sm-6">
                        <i class="fa-solid fa-money-bill-1 fa-2x"></i>
                        <h5>COD/Online Payment</h5>
                    </div>

                    <div class="feature-box col-lg-3 col-sm-6">
                        <i class="fa-solid fa-rotate-left fa-2x"></i>
                        <h5>30 Days Return</h5>
                    </div>

                    <div class="feature-box col-lg-3 col-sm-6">
                        <i class="fa-solid fa-clock fa-2x"></i>
                        <h5>Opens 24/7</h5>
                    </div>

                </div>

            </section>
            <Footer/>

        </div>
    );
}

export default Home;