import React from 'react';
import './Message.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Conversation({data,currentUser}) {
    const [userData, setUserData] = useState(null)
    const userId=data.members.find((id)=>id!==currentUser)
    
    useEffect(()=>{
          
       
            
        const getUserData = async ()=> {
          try
          {  
     const{data}= await  axios.get(`https://project-tool.onrender.com/user/${userId}`)
            console.log(data)
            setUserData(data)
          
          }
        catch(error){
          return (error)
        }
        }
        getUserData()
        
    },[userId])
    
    return (
        <>
         
        <div className="follower conversation">
          
          <div className='d-flex  '>
           
            <img
              src={userData ? userData.imageUrl :null }
              alt="Profile"
              className="followerImage"
              style={{ width: "25px", height: "25px" ,borderRadius:"50%" }}
            />
            <div className="name" style={{fontSize: '1rem'}}>
              <span className='mx-2'>{userData?.firstName} {userData?.lastName}</span>
              
            </div>
          </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
       
    );
}

export default Conversation;