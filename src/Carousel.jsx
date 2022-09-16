import React from "react";
import { Link } from "react-router-dom";

function categoryCarousel() {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <Link to="/shop"><img class="title_carousal" alt="..." src={process.env.PUBLIC_URL + '/images/kidCarousel.jpg'} /></Link>
                    </div>
                    <div class="carousel-item">
                        <Link to="/shop"><img class="title_carousal" alt="..." src={process.env.PUBLIC_URL + '/images/carousel4.png'} /></Link>
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
    
export default categoryCarousel;