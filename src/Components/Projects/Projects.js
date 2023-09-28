import React from 'react';
import Newproject from './Newproject';
import { useEffect } from 'react';
import axios from 'axios'
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { useContext } from 'react';
import Mycontext from '../../Context';
import { useState } from 'react';
import Editproject from './Editproject';



function Projects(props) {
   
    const{userdata}=useContext(Mycontext)
    const[projectdata,setdata]=useState("")
 
    
   
    
    useEffect(()=>{
        const email={
            email:userdata.email
        }
       
        axios.post('https://project-tool.onrender.com/user/projects',email)
        .then((res)=>{
            const completed=res.data.filter((items)=>items.status!=="Completed")
          setdata(completed)
            
        })
        .catch((error)=>{
          console.log(error)
        })
    },[userdata.email])


   

   
    const deleteitem =(id)=>{
        const email={
            email:userdata.email
        }
        axios.post(`https://project-tool.onrender.com/user/deleteproject/${id}`,email)
        .then((res)=>{
            setdata(projectdata.filter(items=>items._id!==id))
          return(res)
         
        })
        .catch((error)=>{
          return(error)
        })
    }

    return (
        <div>
    <div className='d-flex w-100vh'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
{projectdata ? <div className='container'>
<h3>Projects</h3>
      <Newproject />
      
            <table className='table mt-2 table-responsive-sm'>
                <thead>
                    <tr className='text-center'>
                    <th>Name</th>
                    <th>Assignee</th>
                    <th>Status</th>
                    <th>Start date</th>
                    <th>Due date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {projectdata.map(items=>
                  <tr className='text-center'>
                        <td>{items.projectName}</td>
                        <td>{items.projectOwner}</td>
                        <td><i className="fa fa-dot-circle-o m-1" style={{color:"green"}} aria-hidden="true"></i>{items.status}</td>
                        <td>{items.startDate}</td>
                        <td>{items.finishDate}</td>
                        <td><button className='btn btn-danger m-2' onClick={()=>{deleteitem(items._id)}}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <Editproject items={items}/></td>
                         
                    </tr>)}
                    
                </tbody>
            </table>
            
            
        </div>: <div className='container'>
                 <div className='d-flex justify-content-center'>
                    <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>

                    </div>
                 </div>
            </div>}
           
        </div>
        </div>
        </div>
    );
}

export default Projects;