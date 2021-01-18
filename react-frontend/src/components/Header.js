import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    color: 'black'
  },
  topRibbon: {
    display: 'flex'
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user.currentUser)

  const handleLoginRender = (isLoggedIn) => {
    if(isLoggedIn){
        return (
          <React.Fragment>
            <Link to="/logout"> Logout </Link>
            <Link to={`/user/${localStorage.getItem('currentUserUsername')}`}> Profile </Link>
          </React.Fragment>
        )
    }else{
        return(
        <>
            <Link to="/login"> Login </Link>
            <Link to="/sign_up"> Sign Up </Link>
        </>
        )
    }
  }

  return (
    <div className={classes.header}>
      <Link className={classes.header} to="/dashboard"> <ChildCareIcon/>Readit </Link>
      <ul>
        <Link to="/"> Search Bar </Link>
        <Link to="/new_post"> Create Post </Link>
        {
          handleLoginRender(localStorage.getItem('auth_key') !== 'undefined')
        }
      </ul>
    </div>
  )
}

export default Header;