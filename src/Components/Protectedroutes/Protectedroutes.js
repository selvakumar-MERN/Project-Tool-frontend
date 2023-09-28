import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Protectedroutes(props) {
    const tokenvalue = window.localStorage.getItem("projecttoken")
    return (
        <div>
              <div>
           {tokenvalue ? <Outlet/> : <Navigate to='/'/> }
        </div>
        </div>
    );
}

export default Protectedroutes;