import React, { useEffect, useState } from "react";
import Header from "./Header"
import { ShopCards } from "./Cards";
import Footer from "./Footer";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Input } from 'semantic-ui-react';
import Slider from '@material-ui/core/Slider';

function Shop() {

    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([{}]);
    const [searchFilter, setSearchFilter] = useState([{}]);
    const [rangeFilter, setRangeFilter] = useState([{}]);

    const [productData, setProducts] = React.useState([{}]);

    const [value, setValue] = React.useState([0, 10000]);


    const allProducts = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"api/users/shop");
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

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = productData.filter((item) => {
                return Object.values(item)[1].toLowerCase().includes(searchInput.toLowerCase());
            })
            setFilteredResults(filteredData);
        }
        else {
            setFilteredResults(productData);
        }
    }
    // const rangeSelector = (event, newValue) => {
    //     setValue(newValue);
    //     if (value[0]!=0 && value[1]!=0) {
          
    //         const filteredData = productData.filter((item) => {
    //             return (item.price>=value[0] && item.price<=value[1])
    //         });
    //         setFilteredResults(filteredData);
            
    //     }
    //     else {
    //         setFilteredResults(productData);
    //     }
        
    // };

    useEffect(() => {
        allProducts();
    }, []);


    console.log(productData[0]._id);
    function create(items) {
        return (
            <div class="col-lg-3 col-md-6">
                <ShopCards id={items._id} image={items.image} name={items.name} price={items.price} key={items._id} />
            </div>
        );
    };

    return (
        <div>
            <Header />

            <div class="text-center" style={{ padding: 20 }}>
                <Input icon='search'
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                />
                {/* <Slider
                    value={value}
                    onChange={rangeSelector}
                    valueLabelDisplay="on"
                    max="10000"
                /> */}
                {/* Your range of Price is between {value[0]} /- and {value[1]} /- */}
            </div>

            <div class="container p-5">
                <div class="row">
                    {searchInput.length > 1 ?
                        (filteredResults.map(create)) : (productData.map(create))}
                </div>
            </div>




            <Footer />

        </div>
    );
}

export default Shop;