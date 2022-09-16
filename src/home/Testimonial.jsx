
import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export class Testimonials extends Component {
    render() {
        return (
            <div class="testimonial">

                <div class='container' >
                    <div class="testimonial-text">
                        <h3 style={{ color: '#ee5858' }}>REVIEWS</h3>
                        <h1 style={{ color: 'white' }}>What Our Customers Say ?</h1>
                    </div>
                    <OwlCarousel items={3}
                        className="owl-theme"
                        loop
                        nav
                        margin={8} >

                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p1.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Ronne Galle</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p2.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Nikita Grover</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p3.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Jane finn</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p4.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Raj Gupta</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p5.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Ananya Dixit</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card text-center testimonial-card"><img class="card-img-top test-img" src={process.env.PUBLIC_URL + '/images/reviews/p6.jfif'} alt="..."/>
                                <div class="card-body">
                                    <h5>Janice Wilson</h5>
                                    <p class="card-text">“ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                                        impedit quo minus id quod maxime placeat ” </p>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>

            </div>
        )
    }
}


export default Testimonials;