import React ,{useEffect,useState} from "react";
import Mycontext from "./Context";
import axios from "axios";
import { loginverify } from "./Components/Utilis/Apis";


const UserProvider = ({children})=>{
    const[userdata,setuser]=useState({});
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("projecttoken")
       
        }
           
           axios.post(loginverify, usertoken)
            .then((res) => {
                const { data } = res.data
                setuser(data)
               
        })

            .catch((error) => {

                return (error)
            })
            
    }

, [])

    return(
    <Mycontext.Provider value={{userdata,setuser}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;