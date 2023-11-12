import React from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { useState } from 'react';
import Conversation from './Conversation'
import Mycontext from '../../Context';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './Inbox.css'
import Chatbox from './Chatbox';
import { io } from "socket.io-client";
import { useRef } from 'react';



function Inbox(props) {
  
    const [chats, setChats] = useState([]);
    const{userdata}=useContext(Mycontext)
    const [currentChat, setCurrentChat] = useState(null);
    const socket =useRef()
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const[search,setsearch]=useState("")



    const handlesearch=(e)=>{
      
      const value= userdata.team.filter(item => item.firstName+item.lastName.includes(e.target.value))
      setsearch(value)
      
    }
    const submit=(e)=>{
     
            e.preventDefault()
            const id={
              senderId: userdata._id,
              receiverId: search[0]._id
            }
            axios.post(`https://project-tool.onrender.com/user/chat`,id)
            .then((res)=>{
                setChats(res.data)
                
            })
            .catch((error)=>{
              console.log(error)
            })
        
            
    }
    // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  

console.log(chats)


  useEffect(()=>{
    socket.current= io('http://localhost:8000');
    socket.current.emit("new-user-add",userdata._id)
    socket.current.on('get-users',(users)=>{
            
    })
  },[userdata])

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
    
      setReceivedMessage(data);
    }

    );
  }, []); 

    useEffect(()=>{
        
        axios.get(`https://project-tool.onrender.com/user/chat/${userdata._id}`)
        .then((res)=>{
            setChats(res.data)
            
            
        })
        .catch((error)=>{
          return error
        })
    },[userdata._id])
    return (
      <div>
        <div className='d-flex w-100vh'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
        <div className='container'>
        <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
      
        <div className="Chat-container">
        <h2>Chats</h2>
        <input type='search' className='my-2' placeholder='seach user here..' id='search' list='assign' autoComplete='on' onChange={(e)=>{handlesearch(e)}}></input>
        {search? <datalist id='assign'>
                       { search.map(items=>
                       <option >{items.useremail}({items.firstName}{items.lastName})</option>)}
                  </datalist>:<datalist id='assign'><option>No user mATCH</option></datalist>}
           <button className='btn btn-primary' onClick={(e)=>{submit(e)}}>Add USERS </button>         
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
               <Conversation
                  data={chat}
            currentUser={userdata._id}
                
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          
        </div>
        <Chatbox
          chat={currentChat}
          currentUser={userdata._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
        
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    );
}

export default Inbox;