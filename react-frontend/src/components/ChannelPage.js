import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from './Header'
import PostCard from './PostCard';
import ReplyCard from './ReplyCard'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    color: 'black'
  },
  topRibbon: {
    display: 'flex'
  },
  joinButton: {
      backgroundColor: theme.palette.error.main,
      color: "white",
      display: 'flex',
      marginLeft: theme.spacing(3),
  },
  joinedButton: {
    backgroundColor: "white",
    color: theme.palette.error.main,
    display: 'flex',
    marginLeft: theme.spacing(3),
    // outlineColor: theme.palette.error.main,
    // outlineWidth: theme.spacing(.5)
}
}));

const ChannelPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const URL = useParams()

    const currentUser = useSelector(state => state.user.currentUser)

    const allChannels = useSelector(state => state.channels.allChannels)
    const allPosts = useSelector(state => state.posts.allPosts)

    const userFetch = useSelector(state => state.user.userFetch)

    const stateJoined = useSelector(state => state.user.joined)
    // const [joined, setJoined] = useState(stateJoined)

    // useEffect(() => {
    //     setJoined(stateJoined)
    // }, [stateJoined])

    let currentChannelPosts = false
    let currentChannel

    if(userFetch){
        currentChannel = allChannels.find(channel => channel.title === URL.channel_title)
        // debugger
        if(currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id) && stateJoined === false){
            dispatch({type: 'SET_JOINED', joined: true})
        } else if(!currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id) && stateJoined === true){
            dispatch({type: 'SET_JOINED', joined: false})
        }
        const channelPosts = allPosts.filter(post => post.postable_type === "Channel")
        currentChannelPosts = channelPosts.filter(post => post.postable_id === currentChannel.id)
    }
    
    const handleJoin = (e) => {
        console.log(e.target)
        // setJoined(!joined)
        if (stateJoined){
            // dispatch({type: 'SET_JOINED', joined: false})
            // setJoined(false)
            let chanMem = currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id)
            fetch(`http://localhost:3000/channel_members/${chanMem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // debugger
                // dispatch({type: 'SET_JOINED', joined: false})
                console.log(`You have successfully left ${currentChannel.title}'s membership.`)
            })
        } else {
            // dispatch({type: 'SET_JOINED', joined: true})
            // setJoined(true)
            fetch(`http://localhost:3000/channel_members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                },
                body: JSON.stringify({
                    channel_id: currentChannel.id,
                    user_id: currentUser.id
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // debugger
                // dispatch({type: 'SET_JOINED', joined: true})
                console.log(`You have successfully become a member of ${currentChannel.title}.`)
            })
        }

    }

    return (
        <div>
            {(currentChannelPosts) ? 
                <div>
                    <Header />
                    {(currentChannel) ? <div>
                        <div className={classes.topRibbon}>
                            Channel: /readit/{currentChannel.title}
                            {(stateJoined) ? <Button variant="outlined" className={classes.joinedButton} onClick={(e) => handleJoin(e)} >Joined</Button> : <Button variant="contained" className={classes.joinButton} disableElevation onClick={(e) => handleJoin(e)}>Join</Button> }
                        </div>
                    </div> : null}
                    
                    {currentChannelPosts.map(post => <PostCard key={post.id} post={post}/>)}
                </div>
                : null
            }
        </div>
    )
}

export default ChannelPage;