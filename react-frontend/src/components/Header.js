import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    color: 'black'
  },
  topRibbon: {
    display: 'flex'
  },
  userStateButtons: {
    marginLeft: theme.spacing(10),
    display: 'flex'
  },
  ribbonItems: {
    marginLeft: theme.spacing(2)
  },
  sortingRibbon: {
    display: 'block',
    marginLeft: theme.spacing(5)
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user.currentUser)

  const handleLoginRender = (isLoggedIn) => {
    if(isLoggedIn){
        return (
          <div className={classes.userStateButtons}>
            <Link to="/logout"> Logout </Link>
            <Link to={`/user/${localStorage.getItem('currentUserUsername')}`} className={classes.ribbonItems}> Profile </Link>
          </div>
        )
    }else{
        return(
        <div className={classes.userStateButtons}>
            <Link to="/login"> Login </Link>
            <Link to="/sign_up" className={classes.ribbonItems}> Sign Up </Link>
        </div>
        )
    }
  }

  return (
    <div className={classes.header}>
      <Link className={classes.header} to="/dashboard"> <ChildCareIcon/>Readit </Link>
      <ul className={classes.header}>
        <Link to="/" > Search Bar </Link>
        {/* <select>
          <option><Link to="/new_post"> Create Post </Link></option>
          <option><Link to="/new_channel"> Create Channel </Link></option>
        </select> */}
        <Link to="/new_post" className={classes.ribbonItems}> Create Post </Link>
        <Link to="/new_channel" className={classes.ribbonItems}> Create Channel </Link>
        <Link to="/channels" className={classes.ribbonItems}> Channels </Link>
        {
          handleLoginRender(localStorage.getItem('auth_key') !== 'undefined')
        }
      </ul>
      <div className={classes.sortingRibbon}>
        <ul className={classes.header}>
          <div>Hello There</div>
        </ul>
      </div>
    </div>
  )
}

export default Header;