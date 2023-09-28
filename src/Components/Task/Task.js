import React from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Addtask from './Addtask';
import { useContext ,useState, useEffect } from 'react';
import Mycontext from '../../Context';
import axios from 'axios';
import Edittask from './Edittask';



function Task(props) {
    
    const[taskdata,setdata]=useState("")
    const{userdata}=useContext(Mycontext)
  
    useEffect(()=>{
        const email={
            email:userdata.email
        }
       
        axios.post('https://project-tool.onrender.com/user/gettask',email)
        .then((res)=>{
            console.log(res)
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
        axios.post(`https://project-tool.onrender.com/user/deletetask/${id}`,email)
        .then((res)=>{
           setdata(taskdata.filter(items=>items._id!==id))
          return res
         
        })
        .catch((error)=>{
          return(error)
        })
    }



    return (
        <div>
        <div className='d-flex w-100vh'>
            <Sidebar />
            <div className='d-flex flex-column flex-wrap' style={{ width: "100%" }}>
                <Navbar />
               
                {taskdata ? <div className='container' >
                <h3>Task</h3>
                <Addtask setdata={setdata}/>
              
            <table className='table mt-2 table-responsive-sm ' style={{overflow:"scroll"}}>
                <thead>
                    <tr className='text-center'>
                    <th>Name</th>
                    <th>Project Name</th>
                    <th>Assigned To</th>
                    <th>Start date</th>
                    <th>Due date</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 {taskdata.filter(items=>items.status!=="waiting for review").map(items=>
                  <tr className='text-center'>
                         <td>{items.taskName}</td>
                        <td>{items.projectName}</td>
                        <td>{items.assignedTo}</td>
                        <td>{items.startDate}</td>
                        <td>{items.finishDate}</td>
                        <td><i className="fa fa-dot-circle-o m-1" style={{color:"green"}} aria-hidden="true"></i>{items.status}</td>
                        <td><button className='btn btn-danger m-2' onClick={()=>{deleteitem(items._id)}}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <Edittask items={items}/></td>

                    </tr>)}
                    
                </tbody>
            </table>
            
            
        </div>: null}
        
                </div>
            </div>
            </div>
        
    );
}

export default Task;