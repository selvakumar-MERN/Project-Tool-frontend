import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import Mycontext from '../../Context';


function Newproject(props) {

const{userdata}=useContext(Mycontext)
const [project,setproject]=useState({email:userdata.email})   

const handler=(e)=>{
    const{name,value}=e.target
    setproject({...project,[name]:value})
    
}
const submit=(e)=>{
     e.preventDefault()
      axios.post('https://project-tool.onrender.com/user/createproject',project)
      .then((res)=>{
        window.location.reload()
        return res
      })
      .catch((error)=>{
        return(error)
      })
}
    return (
        <div>
            <button type="button" className="btn btn-primary mb-2" data-toggle="modal" data-target=".bd-example-modal-lg">+ New project</button>

<div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className='container mt-3'>
             <h5>Create Project</h5>
             <form className='form mt-3'>
                <div className='row'>
                <div className=' col-md-4 '>
                    <div className='form-group'>
                    <label>Name</label><span style={{color:"red"}}>*</span>
                    <input type='text' name='projectName' required className='form-control' onChange={handler}></input>
                    </div>
                    <div className='form-group'>
                    <label>Project owner</label><span style={{color:"red"}}>*</span>
                    <input type='text' name='projectOwner' required className='form-control' onChange={handler}></input>
                    </div>
                </div>
                
                <div className='col-md-8'>
                <div className='form-group'>
                    <label>Start date</label><span style={{color:"red"}}>*</span>
                    <input type='date' name='startDate' className='form-control' required onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Finish date</label><span style={{color:"red"}}>*</span>
                    <input type='date' name='finishDate' className='form-control' required onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <select  name='status' className='form-control'required onChange={handler}><span style={{color:"red"}}>*</span>
                    <option><span>choose one</span></option>
                        <option >New</option>
                        <option><span>In Progress</span></option>
                        <option><span>Completed</span></option>
                       
                    </select>
                </div>
                </div>
                </div>
                <div>
                    <button className='btn btn-primary m-2' type='submit'  onClick={submit}>Create</button>
                </div>
                
             </form>
      </div>
    </div>
  </div>
</div>
            </div>
    );
}

export default Newproject;