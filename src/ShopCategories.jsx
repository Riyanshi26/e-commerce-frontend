import React, { useEffect, useState, useMemo } from "react";
import Header from "./Header"
import { ShopCards } from "./Cards";
import Footer from "./Footer";
import axios from "axios";

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "./Carousel";

function ShopCategory() {


    const [productData, setProducts] = useState([{}]);
    const [categoryData, setCategoryData] = useState([{}]);
    const [newCategory, setCategory] = useState("");


    const allProducts = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'api/users/shop');
            const products = res.data;

            setProducts(products.data);

            setProducts((state) => {
                console.log(productData);
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

    const allCategories = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'api/users/shopcategory');
            const categories = res.data;

            setCategoryData(categories.data);

            setCategoryData((state) => {
                console.log(categoryData);
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

    var categoryArr = categoryData.map((item) => {
        return {
            value: item.name,
            label: item.name
        }
    });



        const filteredData = useMemo(() => {
            if (!newCategory || newCategory === "all") return productData;

            return productData.filter(item => item.category === newCategory);
        }, [newCategory]);


        useEffect(() => {
            allProducts();
            allCategories();
        }, []);



        function create(items) {
            return (
                <div class="col-lg-3 col-md-6">
                    <ShopCards id={items._id} image={items.image} name={items.name} price={items.price} key={items.id} />
                </div>
            );
        };

        return (
            <div>
                <Header />

                <Carousel/>

                <section>

                    <div className="container" style={{ padding: "3rem" }}>
                        <h1>Categories</h1>
                        <div className="row">
                            <div className="col-md-4">
                                <Select options={categoryArr} onChange={e => setCategory(e.value)} />
                            </div>
                        </div>
                    </div>

                    <div class="container p-5">
                        <div class="row">

                            {newCategory !== "" ?
                                (filteredData.map(create)) : ("")}

                        </div>
                    </div>

                </section>


                <Footer />

            </div>
        );
    }

export default ShopCategory;