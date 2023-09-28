import React from 'react';
import './Dasboard.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { useContext } from 'react';
import Mycontext from '../../Context';
import { Link } from 'react-router-dom';




function Dashboard(props) {
  
 const [completed,setproject]=useState("")   
 const[project,setdata]=useState("")
 const{userdata}=useContext(Mycontext)
 
 useEffect(()=>{
    const email={
        email:userdata.email
    }
    
    axios.post('https://project-tool.onrender.com/user/projects',email)
    .then((res)=>{
        
        const projectdata =res.data
        const ongoing=projectdata.filter((items)=>items.status==="New"||items.status==="In Progress")
        const completed=projectdata.filter((items)=>items.status==="Completed")
        setdata(ongoing)
        setproject(completed)
    })
    .catch((error)=>{
      return error
    })
},[userdata.email])



    return (
        <div>
        <div className='d-flex'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
        <div className='container dashboard'>
            <h3>Dashboard</h3>
          {project ?<div className='card-container'>
                <div className='card-1 border-0 shadow-lg'>
                    <h6 className='m-2'>Task assignes to me({userdata.todoList.filter(item=>item.status!=="In review"&&item.status!=="Completed" ).length})</h6>
                    <hr></hr>
                    { userdata.todoList.filter(item=>item.status!=="In review"&&item.status!=="Completed").length>0 ? <div>
                 {userdata.todoList.filter(item=>item.status!=="In review"&&item.status!=="Completed").map( items=>
                  <div className='row mx-2' >
                    <div className='col-6' style={{fontSize:"15px"}}>
                        
                           <div> <span>{items.taskName}</span></div>
                            {items.status==="New" ?
                            <span style={{backgroundColor:"lightblue"}}>{items.status}</span>: <span style={{backgroundColor:"lightcoral"}}>{items.status}</span>}
                            
                            </div>
                            <div className='col-6' style={{fontSize:"15px"}}>
                               <div> <span>Due: {items.finishDate}</span></div>
                                <Link to='/to-do-list'>view details</Link>
                                
                                
                            </div>
                            <hr className='mt-1'></hr>
                    </div>
                    
                    
                    )}
                    </div>:
                    <div className='text-center' >No Tasks </div>}
                    </div>
                
                <div className='card-2 border-0 shadow-lg'>
                    <h6 className='m-2'>Ongoing projects({project.length})</h6>
                    <hr></hr>
                   { project.length>0 ? <div>
                 {project.map( items=>
                  <div className='row mx-4' >
                    <div className='col-6' style={{fontSize:"15px"}} >
                        
                            <div><span>{items.projectName}</span></div>
                            {items.status==="New" ?
                            <span style={{backgroundColor:"lightblue"}}>{items.status}</span>: <span style={{backgroundColor:"lightcoral"}}>{items.status}</span>}
                           
                            </div >
                            <div className='col-6' style={{fontSize:"15px"}}>
                            <div> <span>Due: {items.finishDate}</span></div>
                                <Link to='/projects'>view details</Link>
                            </div>
                            <hr className='mt-1'></hr>
                    </div>
                    )}
                    </div>:
                    <div className='text-center' >No Projects </div>}
                </div>
                <div className='card-3 border-0 shadow-lg'>
                    <h6 className='m-2'>Completed Projects({completed.length})</h6>
                    <hr></hr>
                   {completed.length>0 ? <div>
                    {completed.map( items=>
                    <div className=' row mx-4'>
                        <div className='col-6' style={{fontSize:"15px"}}>
                        
                        <div><span>{items.projectName}</span></div>
                            <span style={{backgroundColor:"lightgreen"}}>{items.status}</span>
                            
                            </div>
                            <div className='col-6' style={{fontSize:"15px"}}>
                            <div> <span>Due: {items.finishDate}</span></div>
                                <Link to='/projects'>view details</Link>
                            </div>
                            <hr className='mt-1'></hr>
                    </div>)}
                    </div>: <div className='text-center' >No Projects </div> }
                </div>
                <div className='card-4 border-0 shadow-lg'>
                <h6 className='m-2'>Completed Tasks({userdata.todoList.filter(item=>item.status==="Completed").length})</h6>
                <hr></hr>
                { userdata.todoList.filter(item=>item.status==="Completed").length>0 ? <div>
                {userdata.todoList.filter(item=>item.status==="Completed").map( items=>
                <div className='row mx-4' >
                <div className='col-6' style={{fontSize:"15px"}} >
                    
                        <div><span>{items.taskName}</span></div>
                      
                         <span style={{backgroundColor:"lightgreen"}}>{items.status}</span>
                       
                        </div >
                        <div className='col-6' style={{fontSize:"15px"}}>
                        <div> <span>Due: {items.finishDate}</span></div>
                            <Link to='/projects'>view details</Link>
                        </div>
                        <hr className='mt-1'></hr>
                </div>
                )}  
                </div>:
                    <div className='text-center' >No Tasks </div>}
                </div>
                <div className='card-5 border-0 shadow-lg'>
                    <h6 className='m-2'>In review({userdata.todoList.filter(item=>item.status==="In review").length})</h6>
                    <hr></hr>
                    { userdata.todoList.filter(item=>item.status==="In review").length>0 ? <div>
                    {userdata.todoList.filter(item=>item.status==="In review").map( items=>
                    <div className='row mx-4' >
                    <div className='col-6' style={{fontSize:"15px"}} >
                        
                            <div><span>{items.taskName}</span></div>
                          
                             <span style={{backgroundColor:"lightcoral"}}>{items.status}</span>
                           
                            </div >
                            <div className='col-6' style={{fontSize:"15px"}}>
                            <div> <span>Due: {items.finishDate}</span></div>
                                <Link to='/projects'>view details</Link>
                            </div>
                            <hr className='mt-1'></hr>
                    </div>
                    )}
                    </div>:
                    <div className='text-center' >No Tasks for review </div>}
                    </div>
                </div>:<div className='container'>
                 <div className='d-flex justify-content-center'>
                    <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>

                    </div>
                 </div>
            </div>}
            
        </div>
        </div>
        </div>
        </div>
    );
}

export default Dashboard;