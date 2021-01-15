import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import ChildCareIcon from '@material-ui/icons/ChildCare';

const handleLoginRender = (isLoggedIn) => {
    // useEffect

    if(isLoggedIn){
        return (
            <NavLink to="/logout"> Logout </NavLink>
        )
    }else{
        return(
        <>
            <NavLink to="/login"> Login </NavLink>
            <NavLink to="/sign_up"> Sign Up </NavLink>
        </>
        )
    }
}

const Header = (props) => {

  return (
    <div className='navbar'>
      <div className='header'> <ChildCareIcon/>Readit </div>
      <ul>
        <NavLink to="/"> Search Bar </NavLink>
        <NavLink to="/new_post"> Create Post </NavLink>
        {
          handleLoginRender(props.isLoggedIn)
        }
      </ul>
    </div>
  )
}

export default Header;