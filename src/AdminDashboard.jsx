import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';

function Admin() {

    const [tokens, setToken] = React.useState();

    const [productDataNo, setProductsNo] = React.useState(0);
    const [categoryData, setCategoryData] = React.useState([{}]);
    const [newCategory, setCategory] = React.useState("");
    const allProducts = async () => {
        try {

            const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'api/users/shop');
            const products = res.data;

            setProductsNo(Object.keys(products.data).length);
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
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteCategory = async (catId) => {

        setCategoryData(categoryData.filter(ele => {
            return ele._id !== catId;
        })
        );
        setCategory("");

        const delCat = {
            id: catId,
            token: tokens
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/category/delete", delCat, config
            );

        }
        catch (error) {
            console.log(error.response.data);
        }
    };

    var categoryArr = categoryData.map((item) => {
        return {
            value: item._id,
            label: item.name
        }
    });


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setToken(user.token);
        }
        allProducts();
        allCategories();

    }, []);



    return (
        <div class="container " style={{ marginLeft: "9rem", marginBottom:"8rem"}}>

            <div class="row hello">
                <div class="col-3 admin-card " style={{ backgroundColor: "red" }}>
                    <h2>Total Products</h2>
                    <h3>{productDataNo}</h3>

                </div>
                <div class="col-3 col-md-4 admin-card " style={{ backgroundColor: "green" }}>
                    <h2>Total Categories</h2>
                    <h3>{Object.keys(categoryData).length}</h3>
                </div>

                <div class="col-3 admin-card" style={{ backgroundColor: "blue" }}>
                    <h2>Your</h2>
                    <h2>Orders</h2>

                </div>

            </div>

            <div class="row ">
                <div class="col-3 admin-card rounded-0" style={{ backgroundColor: "white" }}>
                    <Link to="/product"><button class="btn btn-md mb-2 add" >Add a Product</button></Link><br />
                    <Link to="/productchange"><button class="btn btn-md mb-2 add">Delete/Update Product</button></Link>

                </div>
                <div class="col-3 col-md-4 admin-card rounded-0" style={{ backgroundColor: "white" }}>
                    <Link to="/category"><button class="btn add btn-md mb-2 ">Add a Category</button></Link> <br />
                    <div style={{ display: "flex" }}>
                        <div><button onClick={() => deleteCategory(newCategory)} class="btn btn-md add " >Delete Category</button></div>
                        <div style={{ color: "black", width: "17rem", marginLeft: "1rem" }}><Select options={categoryArr} onChange={e => setCategory(e.value)} /></div>
                    </div>
                </div>


                <div class="col-3 admin-card " style={{ backgroundColor: "white" }}>
                    <Link to="/vieworders"><button class="btn add btn-md mb-4 ">View All Orders </button></Link><br />

                </div>

            </div>
        </div>



    );
}

export default Admin;