import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { passwordreset, updatepassword } from '../Utilis/Apis';



function Updatepassword(props) {
    const navigate = useNavigate()
    //changing the button state based on api request
    
    const[load,setload]=useState(true)
    //  using useparams hook to get the parameter from url 
    const { token } = useParams()
    // passing token parameter to API FOR VERIFICATION    
    useEffect(() => {
        axios.post(`${passwordreset}/${token}`)
            .then((res) => {
                if(!res){
                    navigate("/invalid")
                }
                return res

            })

            .catch((error) => {
                if(error){
                    navigate("/invalid")
                }
                return error
            })
    }
        ,)
    const pass = {
        password: "",
        confirmpassword: "",
    }
    const [users, setuser] = useState(pass)
    const [successMsg, setsuccess] = useState("")
    const [errorMsg, seterror] = useState("")


    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...users, [name]: value })

    }
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${updatepassword}/${token}`, users)
            .then((res) => {
                seterror("")
                setsuccess(res.data)
                setload(true)
            })
            .catch((error) => {

                const { data } = error.response
                if (data.hasOwnProperty('details')) {
                    setsuccess("")
                    const { details } = data
                    const { message } = details[0]
                    seterror(message)
                    setload(true)
                }
                else {

                    setsuccess("")
                    seterror("Already password updated")
                    setload(true)
                }
            })
    }
    return (
        <div className='container'>
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Reset Password</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id='password' onChange={handler} name='password' placeholder="Enter New Password"></input>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id='confirmpass' onChange={handler} name='confirmpassword' placeholder="Re-enter Password"></input>
                                            </div>
                                            <div className='m-2'>
                                                {successMsg !== null ? <span className='text-success'>{successMsg} </span> : null}
                                                {errorMsg !== null ? <span className='text-danger'>{errorMsg}</span> : null}
                                            </div>
                                            <button onClick={(e)=>{submit(e);setload(false)}} className="btn btn-primary btn-user btn-block">
                                            { load ? <span> Reset Password</span> : <div className='spinner-border text-primary ' role='status'>
                                                 </div>}
                                            </button>
                                            <div>
                                            {successMsg !== null ? <a href='https://password-reset-task01.netlify.app/login'>Login</a>: null }
                                            </div>
                                        </form>
                                        <hr></hr>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <img src='forgetpass.jpg' width={"500px"} height={"500px"} alt='updatepass'></img>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> 

            </div>

        </div>
    );
}

export default Updatepassword;