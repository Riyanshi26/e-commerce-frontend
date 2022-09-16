import React,{useEffect} from "react";
import {useNavigate} from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();
    
    
    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKEND_URL+"api/users/logout",{
                method:"GET",
                headers: {
                        "Content-Type":"application/json",
                       
                    }
                        
            }).then((res) => {
                navigate("/login");
                if(!res.status===200){
                    throw new Error(res.error);
                }
            }).catch((err)=>{
                console.log(err);
            })
    },[] );

    return (
        <div>
            logout page
        </div>
        );
    }
    
export default Logout;