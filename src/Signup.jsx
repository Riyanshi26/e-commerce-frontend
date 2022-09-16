import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    const [signupText,setSignupText] =React.useState({
        name: "",
        email:"",
        password:""
    });

    function handleChange(event){
        const {name,value} = event.target;
        setSignupText((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

    const submitSignup=async(event)=>{
        event.preventDefault();
        const newUser={
            name: signupText.name,
            email:signupText.email,
            password:signupText.password
        }
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                }
            };
            
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/signup",newUser,config
            );
            console.log(data);
            
            window.alert("registration successfull");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    
   

    return (
        <div class="text-center container">
            <div class="sub-container" >
                <img class="signinImg" alt="signup" src={process.env.PUBLIC_URL + '/images/signin.jpg'} />
                <div class="signin-text">
                    <form  class="form-signin">
                        <h1 class="h3 mb-3 font-weight-normal">Sign Up </h1>
                        <div class="form-outline mb-4">
                            <input type="text" class="form-control" onChange={handleChange} name="name" placeholder="Name" value={signupText.name} required />
                        </div>
                        <div class="form-outline mb-4">
                            <input type="email" class="form-control" onChange={handleChange} name="email" placeholder="Email ID" value={signupText.email} required />
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" class="form-control" onChange={handleChange} name="password" placeholder="Password" value={signupText.password} required />
                        </div>
                        <button onClick={submitSignup} class="btn btn-dark btn-block mb-4" type="submit">Sign Up</button>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default Signup;