import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Modal, ModalBody, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import Mycontext from '../../Context';

function Editprofile(props) {
    const{userdata}=useContext(Mycontext)
    const notify = () => toast("Profile updated sucessfully");
    const[show,setshow]=useState(false)
    const handleshow=(item)=>{setshow(true)}
    const handleclose=()=>setshow(false)
    const [user,setuser]=useState(userdata)

    

    const handler=(e)=>{
        const{name,value}=e.target
        setuser({...user,[name]:value})
    }

    const submit=(e,id)=>{
        console.log(id)
        e.preventDefault()
        axios.patch(`https://project-tool.onrender.com/user/updateuser/${id}`,user)
        .then((res)=>{
            notify()
            window.location.reload()
          return(res)
         
        })
        .catch((error)=>{
          return(error)
        })
    }

    return (
        <div>
            <Button onClick={()=>{handleshow()}} className='btn btn-warning m-2' ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
             <Modal show={show}>
            <ModalHeader>
                <ModalTitle>User Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <Form>
                <Row>
                <FormText className='mb-2'>Update the details careefully <span style={{color:"red"}}>*</span></FormText>
                    <Col md={12}>
                        
                        <FormGroup>
                            <FormLabel>First name</FormLabel>
                            <FormControl name='firstName' value={user.firstName} onChange={handler}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Last name</FormLabel>
                            <FormControl name='lastName' value={user.lastName} onChange={handler}></FormControl>
                        </FormGroup> 
                        <FormGroup>   
                            <FormLabel>Email</FormLabel>
                            <FormControl type='email' name='email' value={user.email} onChange={handler}></FormControl>
                       </FormGroup>
                       <FormGroup>   
                            <FormLabel>Role</FormLabel>
                            <FormControl type='text' name='role' value={user.role} onChange={handler}></FormControl>
                       </FormGroup>
                </Col>
                </Row>
                <Button variant='primary m-2'  onClick={(e)=>{submit(e,user._id)}}>Update</Button>
                <ToastContainer />
                <Button variant='secondary m-2' onClick={handleclose}>close</Button>
                </Form>
            </ModalBody>
            
        </Modal>
       
            
        </div>
            
        
    );
}

export default Editprofile;