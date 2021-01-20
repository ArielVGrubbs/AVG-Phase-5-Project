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

    const currentUser = useSelector(state => state.user.currentUser)

    const users = useSelector(state => state.user.allUsers)
    const [allUsers, setAllUsers] = useState(users)

    const posts = useSelector(state => state.posts.allPosts)
    const [allPosts, setAllPosts] = useState(posts)

    const [showLiked, setShowLiked] = useState(false)

    // const likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === currentUser.id)) ? true : false)
    let likedPosts

    let userPosts

    const userFetch = useSelector(state => state.user.userFetch)

    if (userFetch){
        const user = allUsers.find(u => u.username === URL.username)
        likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === user.id)) ? true : false)
        console.log(user)
        userPosts = allPosts.filter(post => post.user.username === user.username)
    }


    useEffect(() => {
        setAllPosts(posts)
    }, [posts])

    const removePost = (post) => {
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    const showLikedPosts = () => {
        setShowLiked(!showLiked)
    }

    return (
        <div>{(userFetch) ? 
            <div>
            
                <Header />
                <p>Hello {localStorage.getItem('currentUserUsername')}</p>
                <p onClick={() => showLikedPosts()}>Show Liked Posts?</p>
                <div>
                    {(currentUser.username === URL.username) ? <div>{(!showLiked) ? userPosts.map(p => <PostCard key={p.id} deletePost={removePost} post={p} userPage={true}/>) : likedPosts.map(p => <PostCard key={p.id} post={p} />)}</div> : <div>{(!showLiked) ? userPosts.map(p => <PostCard key={p.id} post={p} userPage={false}/>) : likedPosts.map(p => <PostCard key={p.id} post={p} />)}</div>}
                </div>
                {/* {(!showLiked) ? userPosts.map(p => <PostCard key={p.id} deletePost={removePost} post={p} userPage={true}/>) : likedPosts.map(p => <PostCard key={p.id} post={p} />)} */}
            </div> : null }
        </div>
    )
}

export default UserPage;