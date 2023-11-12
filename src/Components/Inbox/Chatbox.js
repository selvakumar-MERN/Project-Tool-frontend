import React, { useEffect, useState } from "react";
import "./Chatbox.css";
import axios from 'axios';
import { useRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';
import InputEmoji from 'react-input-emoji'


function Chatbox({ chat, currentUser, setSendMessage , receivedMessage}) {
  TimeAgo.addDefaultLocale(en)
   const timeago= new TimeAgo('en-US')
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
  


  

    // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
     if (chat !== null) {
        axios.get(`https://project-tool.onrender.com/user/${userId}`)
        .then((res)=>{
            setUserData(res.data)
            
        })
        .catch((error)=>{
          return error
        })
     }
  }, [chat, currentUser]);


  useEffect(() => {
    

    if (chat !== null){
        axios.get(`https://project-tool.onrender.com/user/messages/${chat._id}`)
        .then((res)=>{
            setMessages(res.data)
            
        })
        .catch((error)=>{
          return error
        })
    }
  }, [chat]);

 
   // Send Message
   const handleSend = (e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database

    axios.post(`https://project-tool.onrender.com/user/messages`,message)
    .then((res)=>{
        setMessages([...messages, res.data]);
    setNewMessage("");
        
    })
    .catch((error)=>{
      return error
    })
}  
 
// Receive Message from parent component

useEffect(()=> {
       
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }
    // eslint-disable-next-line 
},[receivedMessage,messages])

  const scroll = useRef();
  const imageRef = useRef();
    // Always scroll to last Message
    useEffect(()=> {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])
  
    return (
        <>
        <div className="container">
      <div className="ChatBox-container">
        {chat && userData!=null ? (
          <>
            {/* chat-header */}
            <div className="chat-header" style={{backgroundColor:"lightgray"}}>
              <div className="follower">
                <div className="d-flex">
                  <img
                    src={
                      userData ? userData.imageUrl
                        : null
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" ,borderRadius:"50%"}}
                  
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span className="mx-2  ">
                      {userData.firstName} {userData.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              ></hr>
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{timeago.format ( new Date(message.createdAt))}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <button className="btn btn-warning" onClick = {handleSend}>Send</button>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
      </div>
    </>
    );
}

export default Chatbox;