import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Registration(props) {
    const user = {
        firstName: "",
        lastName: "",
        email: "",
        role:"",
        password: "",
        confirmpassword: ""
    }
    const [fieldverify, setfield] = useState("")
    const [usermessage, setusermessage] = useState("");
    const [Users, setuser] = useState(user)
    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...Users, [name]: value })
        

    }
    const submit = (e) => {
        e.preventDefault()
        axios.post('https://project-tool.onrender.com/user/register', Users)

            .then((res) => {

                const response = res.data
                setusermessage("")
                setfield(response)
            })
            .catch((error) => {
                console.log(error)
                if (Array.isArray(error.response.data.details)) {
                    setfield("")
                    const { details } = error.response.data
                    const { message } = details[0]
                    setusermessage(message)
                }
                else {
                    const response = error.response.data;
                    setusermessage(response)
                }
            })
    }
    return (
        <div>
             <nav className="navbar navbar-light bg-dark justify-content-between">
  <a  className="navbar-brand ml-4" href='/' style={{color:"white"}} >Project Management Tool</a>
  
  
      </nav>
        <div className='container'>
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user" placeholder="First Name" name='firstName' onChange={handler}></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" placeholder="Last Name" name='lastName' onChange={handler}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="email" className="form-control form-control-user" placeholder="Email Address" name='email' onChange={handler}></input>
                                    </div>
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" className="form-control form-control-user" placeholder="Role" name='role' onChange={handler}></input>
                                    </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user" placeholder="Password" name='password' onChange={handler}></input>
                                        </div>

                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user" placeholder="confirm Password" name='confirmpassword' onChange={handler}></input>
                                        </div>

                                    </div>
                                    <div className='m-2'>
                                        {usermessage !== null ? <span className='text-danger'>{usermessage}</span> : null}
                                        {fieldverify !== null ? <span className='text-success'>{fieldverify}</span> : null}
                                    </div>
                                    <button style={{backgroundColor:"#008260",color:"white"}} className="btn btn-user btn-block" onClick={submit}>
                                        Register 
                                    </button>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <Link to='/forgotpassword' className="small">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link to='/' className="small">
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block ">
                            <img className='m-2' src='/Register.jpg' width={"400px"} height={'420px'} alt='registration'></img>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        </div>
    );
}

export default Registration;