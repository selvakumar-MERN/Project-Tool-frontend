import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FormSelect, FormControl , Button, Col, Form, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import { updateproject } from '../Utilis/Apis';

function Editproject(props) {
     
    const [project,setproject]=useState(props.items)   
    const[show,setshow]=useState(false)
    const handleshow=()=>{setshow(true)}

  

  const handler=(e)=>{
    const{name,value}=e.target
    setproject({...project,[name]:value})
    
  }  

 
  const submit =(e,id)=>{
    e.preventDefault()
    axios.patch(`${updateproject}/${id}`,project)
    .then((res)=>{
      window.location.reload()
      return res
     
    })
    .catch((error)=>{
      return error
    })
}

    return (
      <>
      <Button onClick={()=>{handleshow()}} className='btn btn-warning m-2' ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
      <Modal show={show}>
      <ModalHeader>
          <ModalTitle>Projects Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
      <Form>
          <Row>
          
              <Col md={6}>
                  
                  <FormGroup>
                      <FormLabel>Project Name</FormLabel><span style={{color:"red"}}>*</span>
                      <FormControl name='projectName' value={project.projectName}  onChange={handler}></FormControl>
                  </FormGroup>
                  <FormGroup>
                      <FormLabel>Project Owner</FormLabel><span style={{color:"red"}}>*</span>
                      <FormControl name='projectOwner' value={project.projectOwner}  onChange={handler}></FormControl>
                  </FormGroup> 
                 
          </Col>
          <Col md={6}>
          <FormGroup>
                      <FormLabel>Start Date</FormLabel><span style={{color:"red"}}>*</span>
                      <FormControl type='date' name='startDate' value={project.startDate}  onChange={handler} ></FormControl>
                  </FormGroup> 
                  <FormGroup>   
                      <FormLabel>Due Date</FormLabel><span style={{color:"red"}}>*</span>
                      <FormControl type='date' name='finishDate' value={project.finishDate}  onChange={handler}></FormControl>
                 </FormGroup>
                 <FormLabel>status</FormLabel><span style={{color:"red"}}>*</span>
              <FormSelect type='text' name='status' value={project.status}  onChange={handler}>
              <option>choose</option>
              <option>New</option>
              <option>Completed</option>
              
              </FormSelect>
          
          </Col>
          
          
         
          </Row>
          <Button variant='primary m-2'  onClick={(e)=>{submit(e,project._id)}}>Update</Button>
          <Button variant='secondary m-2' onClick={()=>{setshow(false)}}>close</Button>
          </Form>
      </ModalBody>
      <ModalFooter>
          
      </ModalFooter>
  </Modal>
  </>
    );
}

export default Editproject;