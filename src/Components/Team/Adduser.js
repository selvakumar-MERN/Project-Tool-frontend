import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mycontext from '../../Context';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { adduser, alluser, searchuser } from '../Utilis/Apis';

function Adduser(props) {
    const{userdata}=useContext(Mycontext)
const [error,seterror]=useState("")
const [user,setuser]=useState("")
const [data,setdata]=useState("")


useEffect(()=>{
    axios.post(alluser)
    .then((res)=>{
        setdata(res.data)
    })
    .catch((error)=>{
        console.log(error)
    })
},[])


const submit=(e)=>{
    e.preventDefault()
    const details={
          email:userdata.email,
          firstName:user.firstName,
          lastName:user.lastName,
          useremail:user.email
    }
    axios.post(adduser,details)
    .then((res)=>{
     console.log(res)
    })
    .catch((error)=>{
     console.log(error)
    })
}
const search=()=>{
    
   const email= {
    email: document.getElementById("searchemail").value
   }
    axios.post(searchuser,email)
   .then((res)=>{
    seterror("")
     setuser(res.data)
    
   })
   .catch((error)=>{
    setuser("")
     seterror(error.response.data)
   })
}
    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">+ New user</button>

<div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className='container'>
            <h3>Add user</h3>
            
            <Autocomplete
      disablePortal
      id="searchemail"
      options={data}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(data)=>data.email}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
    <button onClick={search} className='btn btn-primary'>search</button>
            
           { user ? <div className='container'>
          <h5>Name: {user.firstName}{user.lastName}</h5>
           <h5>Email: {user.email}</h5>
           <button className='btn btn-warning m-2' onClick={submit}>Add user</button>
        </div>:null}
        {error ?<div style={{color:"red"}}>{error}</div>:null}
    
    </div>
  </div>
</div>
</div>
            
        </div>
    );
}

export default Adduser;