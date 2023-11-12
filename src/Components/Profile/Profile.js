import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext } from 'react';
import Mycontext from '../../Context';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Editprofile from './Editprofile';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadprofile } from '../Utilis/Apis';

function Profile(props) {
    const notify = () => toast("Image updated sucessfully");
    const{userdata}=useContext(Mycontext)
    const[imageurl,setimage]=useState("")

    function previewfiles(file){
        const reader= new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setimage(reader.result)
            
        }
    }
     
    const handlechange=(e)=>{
          const file=e.target.files[0]
          previewfiles(file)
          
    }

    const submit=(e,id)=>{
        e.preventDefault()
           const image={
               profileimage: imageurl
           }

           console.log(image)
           axios.post(`${uploadprofile}/${id}`,image)
           .then((res)=>{
              notify()
             return(res)
            
           })
           .catch((error)=>{  
             return(error)
           })
       }
    
    return (
        <div className='d-flex'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
          <div className='container' >
            <h2>Profile</h2>
            <Form className='m-4'>
                <Row >
                    <Col md={6} style={{textAlign:'center'}}>
                    <img src={userdata.imageUrl} style={{borderRadius:"50%"}} width={"200px"} height={"250px"} alt='profileimage'></img>
                    <div className='m-2'>
                        
                        <input type='file' id='profileimage' onChange={(e)=>{handlechange(e)}} ></input>
                        <div>
                            <button className='btn btn-primary m-2 ' onClick={(e)=>{submit(e,userdata._id)}} >Upload</button>
                            <ToastContainer />
                        </div>
                    </div>
                    </Col>
                    <Col md={6} style={{textAlign:'left',fontSize:'20px'}} >
                        
                        <div>
                        <label style={{fontWeight:"bold"}}>Name : </label>
                        <span style={{color:"blue"}} className='mx-1'>{userdata.firstName}{userdata.lastName}</span>
                        </div>
                        <div>
                        <label style={{fontWeight:"bold"}}>Email  :</label>
                        <span style={{color:"blue"}} className='mx-1'>{userdata.email}</span>
                        </div>
                        <div>
                        <label style={{fontWeight:"bold"}}>Role  :</label>
                        <span style={{color:"blue"}} className='mx-1'>{userdata.role}</span>
                        </div>
                        <div>
                            <Editprofile />
                        </div>
                    </Col>

                </Row>
                </Form>
        </div>
        </div>
        </div>


    );
}

export default Profile;