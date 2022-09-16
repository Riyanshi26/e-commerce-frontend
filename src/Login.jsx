import React from "react";
import axios from "axios";
import{Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function Login() {

    const navigate = useNavigate();

    const [loginText,setLoginText] =React.useState({
        email:"",
        password:""
    });

    function handleChange(event){
        const {name,value} = event.target;
        setLoginText((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

    const submitLogin=async(event)=>{
        event.preventDefault();
        const loginUser={
            email:loginText.email,
            password:loginText.password
        }
        console.log(loginUser);
        try {
            const config={
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials: true
            };

            
            const {data}= await axios.post(
                process.env.REACT_APP_BACKEND_URL+"api/users/login",loginUser,config
            );
            console.log(data);
            localStorage.setItem("userInfo",JSON.stringify(data));
            window.alert("login successfull");
            navigate("/");
  
        } catch (error) {
            navigate("/signup");
            console.log(error);
        }
    };
    return (
        <div class="text-center container">
            <div class="sub-container" >
              
                    <img class="signinImg" alt="login" src={process.env.PUBLIC_URL + '/images/login.jpg'} />
                
                <div class="signin-text">
                    <form  onSubmit={submitLogin} class="form-signin">
                        <h1 class="h3 mb-3 font-weight-normal">Login </h1>
                        <div class="form-outline mb-4">
                            <input type="email" onChange={handleChange} class="form-control" name="email" placeholder="Email ID" value={loginText.email} required />
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" onChange={handleChange} class="form-control" name="password" placeholder="Password" value={loginText.password} required />
                        </div>
                        <button class="btn btn-dark btn-block mb-4" type="submit">Login</button>
                    </form>
                    Not a member?
                    <Link style={{ display: "inline", color:"blue",textDecoration: "none"}} to="/signup">  Signup Now</Link> 
                </div>

            </div>
        </div>
    );
}

export default Login;