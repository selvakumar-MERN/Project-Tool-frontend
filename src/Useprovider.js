import React ,{useEffect,useState} from "react";
import Mycontext from "./Context";
import axios from "axios";


const UserProvider = ({children})=>{
    const[userdata,setuser]=useState({});
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("projecttoken")
       
        }
           
           axios.post('https://project-tool.onrender.com/user/loginverify', usertoken)
            .then((res) => {
                const { data } = res.data
                setuser(data)
                console.log(data)
        })

            .catch((error) => {

                console.log(error)
            })
            
    }

, [])

    return(
    <Mycontext.Provider value={{userdata}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;