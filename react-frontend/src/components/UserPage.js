import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
    // const classes = useStyles();
    const dispatch = useDispatch();
    const URL = useParams()

    const users = useSelector(state => state.user.allUsers)
    const [allUsers, setAllUsers] = useState(users)
    const user = allUsers.find(u => u.username === URL.username)

    const posts = useSelector(state => state.posts.allPosts)
    const [allPosts, setAllPosts] = useState(posts)

    let userPosts = allPosts.filter(post => post.user.username === user.username)

    useEffect(() => {
        setAllPosts(posts)
    }, [posts])

    const removePost = (post) => {
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    return (
        <div>
            <Header />
            <p>Hello {localStorage.getItem('currentUserUsername')}</p>
            {userPosts.map(p => <PostCard key={p.id} deletePost={removePost} post={p} userPage={true}/>)}
        </div>
    )
}

export default UserPage;