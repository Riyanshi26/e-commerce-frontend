import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

    const [show, setShow] = React.useState(false);


    const callAboutUser = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/aboutuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            const data = await res.json();
            console.log("header",data);
            setShow(true);

            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callAboutUser();
    }, []);

    return (
        <section id="title">

            <div>
                <nav class="navbar navbar-expand-lg navbar-dark ">
                    <img class="logo" alt="logo" src={process.env.PUBLIC_URL + '/images/logo.jpeg'} />
                    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul class="navbar-nav ms-auto  ">
                            <li class="nav-item">
                                <Link to="/" class="nav-link" aria-current="page">Home</Link>
                            </li>
                            <li class="nav-item">
                                <NavDropdown
                                    id="nav-dropdown-example"
                                    title="Shop"
                                >
                                    <NavDropdown.Item><Link to="/shop"> All Products</Link></NavDropdown.Item>
                                    <NavDropdown.Item> <Link to="/shopcategory">Products By Category</Link> </NavDropdown.Item>
                                    
                                </NavDropdown>
                            </li>
                            <li class="nav-item">
                                <Link to="/aboutuser" class="nav-link">Profile</Link>
                            </li>
                            {show ?
                                <><li class="nav-item">
                                    <Link to="/logout" class="nav-link">Logout</Link>
                                </li></>
                                :
                                <>
                                    <li class="nav-item">
                                        <Link to="/login" class="nav-link" >Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/signup" class="nav-link">Signup</Link>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Header;