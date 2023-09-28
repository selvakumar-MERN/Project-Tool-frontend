import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Mycontext from '../../Context';
import axios from 'axios';


function Team(props) {

    const[user,setdata]=useState("")
    const{userdata}=useContext(Mycontext)
    const [search,setsearch]=useState("")



useEffect(()=>{
    axios.post('https://project-tool.onrender.com/user/alluser')
    .then((res)=>{
        setsearch(res.data)
    })
    .catch((error)=>{
        return error
    })
},[])
    useEffect(()=>{
        const email={
            email:userdata.email
        }
       
        axios.post('https://project-tool.onrender.com/user/getusers',email)
        .then((res)=>{
          setdata(res.data)
          
         
        })
        .catch((error)=>{
          return error
        })
    },[userdata.email])

    const submit=(e,id)=>{
           e.preventDefault()
           const email={
            email:userdata.email
        }

           axios.post(`https://project-tool.onrender.com/user/deleteuser/${id}`,email)
           .then((res)=>{
             setdata(res.data)
            
           })
           .catch((error)=>{
             return error
           })
    }

    const addUser=()=>{
      const email=  document.getElementById("searchemail").value
       
      
      const details={
            email:userdata.email,
            useremail: email,
      }
      axios.post('https://project-tool.onrender.com/user/adduser',details)
      .then((res)=>{
       setdata(res.data)
      })
      .catch((error)=>{
       return error
      })
  }
    return (
      <div>
      <div className='d-flex w-100vh'>
        <Sidebar/>
        <div className='d-flex flex-column flex-wrap' style={{width:"100%"}}>
        <Navbar/>
       {user ? <div className='container'>
         <h2>Team</h2>
         <div className='d-flex'>
         <Autocomplete style={{height:'50px'}}
      disablePortal
      id="searchemail"
      options={search}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(search)=>search.email}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Add user" />}
      />
       <button className='btn btn-warning m-2' onClick={addUser}>Add user</button>
      </div>
            <table className='table mt-2 table-responsive-sm'>
                <thead>
                    <tr className='text-center'>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(items=>
                  <tr className='text-center'>
                        <td>{items.firstName}{items.lastName}</td>
                        <td>{items.role}</td>
                        <td>{items.useremail}</td>
                        <td><button className='btn btn-danger' onClick={(e)=>{submit(e,items._id)}}><i class="fa fa-trash" aria-hidden="true"></i></button></td>

                    </tr>
                       )}
                </tbody>
            </table>

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
    );
}

export default Team;