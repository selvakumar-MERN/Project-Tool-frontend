import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormSelect, FormControl , Button, Col, Form, FormGroup, FormLabel, FormText, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';

function Edittask(props) {
    const notify = () => toast("Task updated sucessfully");
    const[show,setshow]=useState(false)
    const [task,settask]=useState(props.items)  
    const handleshow=(item)=>{setshow(true)}
    const handleclose=()=>setshow(false)
    
    const handler=(e)=>{
        const{name,value}=e.target
        settask({...task,[name]:value})
    }

    const submit=(e,id)=>{
        e.preventDefault()
        axios.patch(`https://project-tool.onrender.com/user/updatetask/${id}`,task)
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
                <ModalTitle>Task Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <Form>
                <Row>
                <FormText className='mb-2'>Update the details careefully <span style={{color:"red"}}>*</span></FormText>
                    <Col md={6}>
                        
                        <FormGroup>
                            <FormLabel>Task Tittle</FormLabel>
                            <FormControl name='taskName' value={task.taskName} onChange={handler}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl name='projectName' value={task.projectName} onChange={handler}></FormControl>
                        </FormGroup> 
                        <FormGroup>   
                            <FormLabel>Task Description</FormLabel>
                            <FormControl type='textarea' name='taskDescription' value={task.taskDescription} onChange={handler}></FormControl>
                       </FormGroup>
                       <FormGroup>   
                            <FormLabel>Assigned To</FormLabel>
                            <FormControl type='text' name='assignedTo' value={task.assignedTo} onChange={handler}></FormControl>
                       </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl type='date' name='startDate' value={task.startDate} onChange={handler}></FormControl>
                        </FormGroup> 
                        <FormGroup>   
                            <FormLabel>Due Date</FormLabel>
                            <FormControl type='date' name='finishDate' value={task.finishDate} onChange={handler}></FormControl>
                       </FormGroup>
                       <FormGroup>
                            <FormLabel>Document Link</FormLabel>
                            <FormControl type='text' name='docLink' value={task.docLink} onChange={handler}></FormControl>
                        </FormGroup> 
                       <FormLabel>status</FormLabel>
                    <FormSelect type='text' name='status' value={task.status} onChange={handler}>
                    <option>choose</option>
                    <option>New</option>
                    <option>Completed</option>
                    </FormSelect>
                
                </Col>
                
                
               
                </Row>
                <div className='d-flex justify-content-end'>
                <Button variant='primary m-2'  onClick={(e)=>{submit(e,task._id)}}>Update</Button>
                <ToastContainer />
                <Button variant='secondary m-2' onClick={handleclose}>close</Button>
                </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>
       
            
        </div>
    );
}

export default Edittask;