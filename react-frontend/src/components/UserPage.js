import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import PostCard from './PostCard'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
  },
  topRibbon: {
    display: 'flex'
  }
}));

const UserPage = () => {
  const classes = useStyles();
//   const allUsers = useSelector(state => state.user.allUsers)
//   const URL = useParams()
//   const user = allUsers.find(u => u.username === URL.username)
  let userPosts = useSelector(state => state.posts.allPosts).filter(post => post.user.username === localStorage.getItem('currentUserUsername'))

  return (
    <div>
        <Header />
        <p>Hello {localStorage.getItem('currentUserUsername')}</p>
        {userPosts.map(p => <PostCard key={p.id} post={p} userPage={true}/>)}
    </div>
  )
}

export default UserPage;