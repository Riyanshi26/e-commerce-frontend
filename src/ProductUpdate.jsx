import React,{useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import storage from "./firebase";
import { useParams } from "react-router-dom";

function ProductUpdate() {   

    const param = useParams();
    const productId = param.productId;

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
            id:productId,
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
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/product/update",newProduct,config
            );
            window.alert("New product updated successfully");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

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
                        <h1 class="h2 mb-3 font-weight-normal">Update the Product </h1>
                        <div >
                        
                        {selectedFile &&  <img class="product-img" src={preview} /> }
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
                             <button onClick={submitProduct} style={{ width: "9rem" }} class="btn btn-dark btn-block mb-4" type="submit">Update Product</button>
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

export default ProductUpdate;