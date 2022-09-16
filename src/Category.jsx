import React,{useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function Category() {  

    const navigate = useNavigate();

    
    const [tokens,setToken] = React.useState();
    const [category,setCategory] =React.useState({
        name: ""
    });

    const authAdmin = async () => {
        try {

            const res = await fetch(process.env.REACT_APP_BACKEND_URL+"api/users/authadmin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                
            });
            const data = await res.json();

            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
            navigate("/login");
        }
    }
    function handleChange(event){
        const {name,value} = event.target;
        setCategory((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

    const submitCategory=async(event)=>{
        event.preventDefault();
        const newCategory={
            name: category.name,
            token:tokens
        }
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                }
            };
            console.log(newCategory);
            //setLoading(true);
            
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/category/create",newCategory,config
            );
      
            localStorage.setItem("categoryInfo",JSON.stringify(data));
            window.alert("New category added successfully");
            //setLoading(false);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
         setToken(user.token);
        }
        authAdmin();
      }, []);

    return (
        
        <div class = "admin">
        <Header/>
            <div class="admin-container" >
                    <form  >
                        <h1 class="h2 mb-3 font-weight-normal">Add a Category </h1>
                        <div class="form-outline mb-4">
                            <input type="text" class="form-control" onChange={handleChange} name="name" placeholder="Name" value={category.name} required />
                        </div>
                        
                        <button onClick={submitCategory} style={{ width: "13rem" }} class="btn btn-dark btn-block mb-4" type="submit">Add</button>
                    </form>              

            </div>
       
         
        <div class=" admin-footer footer-dark">
            <p class="text-center copyright">The Fashion Store © 2022</p>
        </div>
        </div>
    );
}

export default Category;