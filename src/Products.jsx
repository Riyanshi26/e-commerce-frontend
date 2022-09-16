import React,{useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import storage from "./firebase";
import { useNavigate } from "react-router-dom";

function Product() {   

    const navigate=useNavigate();
    const [selectedFile, setSelectedFile] = React.useState()
    const [percent, setPercent] = React.useState(0);
    const [imageURL, setImageURL] = React.useState()
    const [preview, setPreview] = React.useState()
    const [tokens,setToken] = React.useState();
    const [product,setProduct] =React.useState({
        name: "",
        description:"",
        price: Number,
        category:"",
        quantity:Number

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
        setProduct((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

    const onSelectFile = e => { 
        if (!e.target.files || e.target.files.length === 0) { 
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }


    const handleUpload = async(event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageURL(url);
                });
            }
        );
    };

    const submitProduct=async(event)=>{
        event.preventDefault();
        const newProduct={
            name: product.name,
            description:product.description,
            price:product.price,
            category:product.category,
            quantity:product.quantity,

            token:tokens,
            image:imageURL
        }
        
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                }
            };
           
            //setLoading(true);
            
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/product/create",newProduct,config
            );
      
            localStorage.setItem("productInfo",JSON.stringify(data));
            window.alert("New product added successfully");
            //setLoading(false);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

        authAdmin();
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
         setToken(user.token);
        }

        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

     
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    

    return (
        
        <div class = "admin">
        <Header/>
            <div class="admin-product-container" >
                    <form  >
                        <h1 class="h2 mb-3 font-weight-normal">Add a Product </h1>
                        <div >
                        
                        {selectedFile &&  <img alt="product" class="product-img" src={preview} /> }
                        </div>
                        
                        <div class="row">

                        <div class=" col-6 form-outline mb-4">
                            <input type="text" class="form-control"onChange={handleChange} value={product.name} name="name" placeholder="Name"  required />
                        </div>
                        <div class=" col-6 form-outline mb-4">
                        <input type="file" id="image" name="image" accept="image/*" onChange={onSelectFile} required/>
                        </div>
                        <div class="col-6 form-outline mb-4">
                            <input type="text" class="form-control" onChange={handleChange} value={product.description} name="description" placeholder="Description" required />
                        </div>
                        <div class="col-6 form-outline mb-4">
                            <input type="number" class="form-control" onChange={handleChange} value={product.price} name="price" placeholder="price" required />
                        </div>
                        <div class="col-6 form-outline mb-4">
                            <input type="text" class="form-control" onChange={handleChange} value={product.category} name="category" placeholder="category" required />
                        </div>
                        <div class="col-6 form-outline mb-4">
                            <input type="number" class="form-control" onChange={handleChange} value={product.quantity} name="quantity" placeholder="quantity" required />
                        </div>

                        <div class="col-6 form-outline mb-4">
                             <button onClick={submitProduct} style={{ width: "9rem" }} class="btn btn-dark btn-block mb-4" type="submit">Add Product</button>
                        </div>

                        <div class="col-6 form-outline mb-4">
                             <button onClick={handleUpload} class="btn btn-dark btn-block mb-4" >Upload Image to Firebase</button>
                             <p>{percent} "% done"</p>
                        </div>
                        
            

                        </div>
                        
                    </form>              

            </div>
       
         
        <div class=" admin-footer footer-dark">
            <p class="text-center copyright">The Fashion Store © 2022</p>
        </div>
        </div>
    );
}

export default Product;