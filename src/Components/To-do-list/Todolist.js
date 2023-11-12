import React,{useContext,useState,useEffect} from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Mycontext from '../../Context';
import { FormSelect,Button, Col, Form, FormControl, FormGroup, FormLabel, FormText, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import axios from 'axios';
import './Todolist.css'
import { gettodo, inreview, reviewedtask } from '../Utilis/Apis';


function Todolist(props) {
  
    const{userdata,setuser}=useContext(Mycontext)
    const[show,setshow]=useState(false)
    const[todo,settodo]=useState("")
  const[tododata,setdata]=useState("")
  const handleshow=(item)=>{setshow(true); settodo(item)}
    const handleclose=()=>setshow(false)
    useEffect(()=>{
        const email={
            email:userdata.email
        }
       
        axios.post(gettodo,email)
        .then((res)=>{
            console.log(res)
            const completed=res.data.filter((items)=>items.status!=="Completed"&& items.status!=="In review")
          setdata(completed)
         
        })
        .catch((error)=>{
          console.log(error)
        })
    },[userdata.email])

    const submit=(id)=>{
           const link={
            email:userdata.email, submittedlink:document.getElementById("githubLink").value}
           axios.post(`${inreview}/${id}`,link)
           .then((res)=>{
              handleclose()
               return(res)
            
           })
           .catch((error)=>{
              return(error)
           })
    }

    const completereview=(id)=>{
        const link={
            email:userdata.email, status:document.getElementById("status").value}
           axios.post(`${reviewedtask}/${id}`,link)
           .then((res)=>{
               handleclose()
               setuser(res.data.data)
              
            
           })
           .catch((error)=>{
             return (error)
           })
    }
    
    return (
        <div>
       <div className='d-flex w-100vh'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
        
        {tododata.length>0 ? <div className='container' >
            <h3>To do list</h3>
            <table className='table mt-2 table-responsive-sm'>
                <thead>
                    <tr className='text-center ' >
                    <th>Name</th>
                    <th>Project Name</th>
                    <th>Assigned By</th>
                    <th>Start date</th>
                    <th>Due date</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {tododata.map(items=>
                  <tr className='text-center'>
                         <td>{items.taskName}</td>
                        <td>{items.projectName}</td>
                        <td>{items.assignedBy}</td>
                        <td>{items.startDate}</td>
                        <td>{items.finishDate}</td>
                        <td><i className="fa fa-dot-circle-o m-1" style={{color:"green"}} aria-hidden="true"></i>{items.status}</td>
                        <td>
                        <button className='btn btn-warning m-2' onClick={()=>{handleshow(items)}}><i class="fa fa-folder-open" aria-hidden="true"></i></button></td>

                    </tr>)}
                    
                </tbody>
            </table>
            
            
        </div>:<div className='container d-flex justify-content-center'><h3>No items to display</h3></div>}
       {todo.status!=="waiting for review" ?
            <Modal show={show}>
            <ModalHeader>
                <ModalTitle>Task Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                <label>Task Tittle</label>
                <h6>{todo.taskName}</h6>
                <label>Project Name</label>
                <h6>{todo.projectName}</h6>
                <label>Task Description</label>
                <p>{todo.taskDescription}</p>
                </Col>
                <Col md={6}>
                <label>Start Date</label>
                <p>{todo.startDate}</p>
                <label>Due Date</label>
                <p>{todo.finishDate}</p>
                <label>Assigned On</label>
                    <p>{todo.date}</p>
                
                </Col>
                <Form>
                   <FormGroup>
                    <FormLabel>Github link</FormLabel>
                    <FormControl type='text' placeholder='Enter the code link' id='githubLink' required></FormControl>
                    <FormText>Please Check before submitting for review</FormText>
                   </FormGroup>
                </Form>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary'  onClick={()=>{submit(todo._id)}}>Submit</Button>
                <Button variant='secondary' onClick={handleclose}>close</Button>
            </ModalFooter>
        </Modal>
                :
                <Modal show={show}>
                <ModalHeader>
                    <ModalTitle>Task Details</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                    
                    <label>Task Tittle</label>
                    <p>{todo.taskName}</p>
                    
                    
                    <label>Project Name</label>
                    <p>{todo.projectName}</p>
                    
                    <label>Task Description</label>
                    <p>{todo.taskDescription}</p>
                    <label>Submitted By</label>
                    <p>{todo.assignedTo}</p>
                    </Col>
                    <Col md={6}>
                    <label>Start Date</label>
                    <p>{todo.startDate}</p>
                    <label>Due Date</label>
                    <p>{todo.finishDate}</p>
                    <label>Submitted Link</label>
                    <p><a href={todo.submissionlink} target='blank'>{todo.submissionlink}</a></p>
                    <label>Submitted On</label>
                    <p>{todo.date}</p>
                    </Col>
                    <Form>
                       <FormGroup>
                        <FormLabel>Status</FormLabel>
                        <FormSelect type='text'  id='status' required>
                        <option>choose</option>
                        <option style={{color:'darkgreen',fontWeight:'bold'}}>Completed</option>
                        </FormSelect>
                        <FormText>Please review carefully</FormText>
                       </FormGroup>
                    </Form>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button variant='primary'  onClick={()=>{completereview(todo._id)}}>Submit</Button>
                    <Button variant='secondary' onClick={handleclose}>close</Button>
                </ModalFooter>
            </Modal>
                
                
                }
                </div>
        </div>
        </div>
    );
}

export default Todolist;