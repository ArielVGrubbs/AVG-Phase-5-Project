import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from './Header';
import PostCard from './PostCard'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
    },
    topRibbon: {
        display: 'flex'
    },
    makeModeratorSubmit: {
        backgroundColor: theme.palette.error.main,
        color: 'white',
        marginLeft: theme.spacing(2),
        height: theme.spacing(3),
        borderRadius: theme.spacing(1),
    }
}));

const UserPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const URL = useParams()

    const currentUser = useSelector(state => state.user.currentUser)
    const allChannels = useSelector(state => state.channels.allChannels)

    const users = useSelector(state => state.user.allUsers)
    const [allUsers, setAllUsers] = useState(users)

    const posts = useSelector(state => state.posts.allPosts)
    const [allPosts, setAllPosts] = useState(posts)

    const [showLiked, setShowLiked] = useState(false)

    const [showModerator, setShowModerator] = useState(false)
    const [showBan, setShowBan] = useState(false)

    // const likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === currentUser.id)) ? true : false)
    let likedPosts
    let userPosts
    let currentUsersChannels
    let user

    const userFetch = useSelector(state => state.user.userFetch)

    if (userFetch){
        user = allUsers.find(u => u.username === URL.username)
        likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === user.id)) ? true : false)
        // console.log(user)
        userPosts = allPosts.filter(post => post.user.username === user.username)

        currentUsersChannels = allChannels.filter(ch => ch.channel_owners.find(c_o => c_o.user_id === currentUser.id) && ch.channel_members.find(c_m => c_m.user_id === user.id))
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

    const handleMakeModerator = (e) => {
        e.preventDefault()
        console.log(e.target)

        let channel = allChannels.find(ch => ch.title === e.target.firstElementChild.value)
        fetch(`http://localhost:3000/channel_owners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                user_id: user.id,
                channel_id: channel.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type: 'ADD_MODERATOR', channelOwner: data})
        })
    }

    const handleBanUser = (e) => {
        e.preventDefault()
        console.log(e.target)

        let channel = allChannels.find(ch => ch.title === e.target.firstElementChild.value)
        console.log(allUsers)
        console.log(userFetch)
        if(user.channel_members.find(c_m => c_m.channel_id === channel.id)){
            let channelMember = user.channel_members.find(c_m => c_m.channel_id === channel.id)
            fetch(`http://localhost:3000/channel_members/${channelMember.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({type: 'BAN_USER', channelMember: channelMember, channelTitle: channel.title})
            })
        }
    }

    return (
        <div>{(userFetch) ? 
            <div>
            
                <Header />
                <div>
                    {(localStorage.getItem('currentUserUsername') !== URL.username) ? <div><p>Hello {localStorage.getItem('currentUserUsername')}, you're viewing {URL.username}'s page</p><Button onClick={(e) => setShowModerator(!showModerator)}>Make Moderator</Button><Button onClick={(e) => setShowBan(!showBan)}>Ban User From Channel</Button></div> : <p>Hello {URL.username}</p> }
                </div>
                <div>
                    {(showModerator) ? 
                        <div>
                            <form onSubmit={(e) => handleMakeModerator(e)}>
                                Select a channel you moderate and wish to make this user a moderator of:
                                <select>
                                    {currentUsersChannels.map(cUC => <option key={cUC.id}>{cUC.title}</option>)}
                                </select>
                                <button type="Submit" className={classes.makeModeratorSubmit} >Submit</button>
                            </form>
                        </div> : null}
                </div>
                <div>
                    {(showBan) ? 
                        <div>
                            <form onSubmit={(e) => handleBanUser(e)}>
                                Select a channel you moderate and wish to ban this user from:
                                <select>
                                    {currentUsersChannels.map(cUC => <option key={cUC.id}>{cUC.title}</option>)}
                                </select>
                                <button type="Submit" className={classes.makeModeratorSubmit} >Submit</button>
                            </form>
                        </div> : null}
                </div>
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