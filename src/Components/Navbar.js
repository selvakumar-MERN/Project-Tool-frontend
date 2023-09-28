import axios from 'axios';
import React from 'react';
import { useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Navbar(props) {
    const navigate=useNavigate()
    const [userdata,setdata]=useState("")
    const logout=()=>{
        window.localStorage.clear()
        navigate('../')
        window.location.reload()
    }
    useEffect(() => {
        const usertoken = {
            token: window.localStorage.getItem("projecttoken")
        }

        axios.post('https://project-tool.onrender.com/user/loginverify', usertoken)
            .then((res) => {
                const { data } = res.data
                
                setdata(data)
        })

            .catch((error) => {

                return error
            })
    }, [])
    return (
        <div style={{width:"100%"}}>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/* Sidebar Toggle (Topbar)*/}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>


                    {/* Topbar Navbar*/}
                    <ul className="navbar-nav ml-auto">

                      <div className="topbar-divider d-none d-sm-block"></div>

                        {/* Nav Item - User Information*/}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userdata.firstName}{userdata.lastName}</span>
                                <img className="img-profile rounded-circle" width={"30px"} height={"30px"} src={userdata.imageUrl} alt='.'></img>
                            </a>
                            {/* Dropdown - User Information*/}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <Link className="dropdown-item" to='/profile'>
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>
                               
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal" onClick={logout}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
        </div>    
        
        
    );
}

export default Navbar;