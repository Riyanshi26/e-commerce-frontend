import React from "react";
import { Link } from "react-router-dom";

function HomeCarousel() {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="title_carousal" alt="..." src={process.env.PUBLIC_URL + '/images/carousal1.jfif'} />
                        <div class="carousel-caption">
                            <Link to="/shop"><button type="button" class="btn btn-dark btn-lg ">SHOP NOW</button></Link>
                        </div>

                    </div>
                    <div class="carousel-item">
                        <img class="title_carousal" alt="..." src={process.env.PUBLIC_URL + '/images/carousal2.jpg'} />
                        <div class="carousel-caption content2 text-start">
                            <h1>NEW ARRIVAL</h1>
                            <h3>UPTO 30% OFF</h3>
                            <Link to="/shopcategory"><button type="button" class="btn btn-outline-light btn-lg">SHOP NOW</button></Link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img class="title_carousal" alt="..." src={process.env.PUBLIC_URL + '/images/carousal3.jpg'} />
                        <div class="carousel-caption content3">
                            <Link to="/shopcategory"><button type="button" class="btn btn-light btn-lg">SHOP NOW</button></Link>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev carousel-button" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-button" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        );
    }
    
export default HomeCarousel;