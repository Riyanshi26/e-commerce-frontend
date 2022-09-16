import React from "react";
import{Link} from "react-router-dom";

function Footer() {
    return (
        <section id="footer">
            <div class="container py-5 footer-dark">
                <div class="row py-4">

                    <div class="col-lg-3">
                        ABOUT US
                        <p><em>At TFS, all that you 
                        see is hand-picked and from 
                        the best brands over the
                        world, only for you.</em></p>
                        <ul class="list-inline mt-4">
                            <li class="list-inline-item"><i class="fa fa-twitter fa-2x"></i></li>
                            <li class="list-inline-item"><i class="fa fa-facebook fa-2x"></i></li>
                            <li class="list-inline-item"><i class="fa fa-instagram fa-2x"></i></li>
                            <li class="list-inline-item"><i class="fa-brands fa-linkedin fa-2x"></i></li>
                        </ul>
                    </div>
                    <div class="col-lg-3">
                        
                    </div>
                    <div class="col-lg-3">
                        USEFUL LINKS
                        <ul class="list-unstyled mb-0">
                            <li class="mb-2"><Link to="/">Home</Link></li>
                            <li class="mb-2"><Link to="/shop">Shop</Link></li>
                            <li class="mb-2"><Link to="/aboutuser">Profile</Link></li>
                        </ul>

                    </div>
                    <div class="col-lg-3">
                        CONTACT
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit,
                            sed do eiusmod tempor incit.<br/>
                            +(91) 255 9646888<br/>
                            tfs@gmail.com</p>
                    </div>
                </div>
                <p class="text-center copyright">The Fashion Store © 2022</p>
            </div>

        </section>
    );
}

export default Footer;


