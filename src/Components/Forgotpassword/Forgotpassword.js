import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { passwordreset } from '../Utilis/Apis';


function Forgotpassword(props) {
    const email = {
        email: ""
    }
    const [userEmail, setEmail] = useState(email)
    const [successMsg, setsuccess] = useState("")
    const [errorMsg, seterror] = useState("")
    const [load,setload]=useState(true)
    const handler = (e) => {
        const { name, value } = e.target;
        setEmail({ ...userEmail, [name]: value })
    }
    const submit = (e) => {
        e.preventDefault();
        axios.post(passwordreset, userEmail)
            .then((res) => {
                seterror("")
                setsuccess(res.data)
                setload(true)
            })
            .catch((error) => {
                const { data } = error.response
                setsuccess("")
                seterror(data)
                setload(true)
            })



    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 d-none d-lg-block'>
                    <img src='forgetpass.jpg' height={"500px"} width={"500px"} alt='passwordimage'></img>
                </div>
                <div className='col-md-6'>
                    <div className='container mr-4' style={{ width: "600px", maxWidth: "100%" }}>
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                                    and we'll send you a link to reset your password!</p>
                                            </div>
                                            <form className="user ml-auto">
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user" name='email' onChange={handler} placeholder="Enter Email Address..."></input>
                                                </div>
                                                <div className='m-2'>
                                                    {successMsg !== null ? <span className='text-success'>{successMsg}</span> : null}
                                                    {errorMsg !== null ? <span className='text-danger'>{errorMsg}</span> : null}
                                                </div>
                                                <button onClick={(e)=>{submit(e);setload(false)}} className="btn btn-success btn-user btn-block">
                                                 { load ? <span> Reset Password</span> : <div className='spinner-border text-primary ' role='status'>
                                                 </div>}
                                                </button>
                                            </form>
                                            <hr></hr>
                                            <div className="text-center">
                                                <Link to="/register"
                                                    className="small">Create an Account!
                                                </Link>
                                            </div>
                                            <div className="text-center">
                                                <Link to="/login"
                                                    className="small">Already have an account? Login!
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    );
}

export default Forgotpassword;