import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

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

    let currentChannelPosts = false
    // let currentChannel

    if(userFetch){
        const currentChannel = allChannels.find(channel => channel.title === URL.channel_title)
        const channelPosts = allPosts.filter(post => post.postable_type === "Channel")
        // debugger
        currentChannelPosts = channelPosts.filter(post => post.postable_id === currentChannel.id)
    }

  return (
    <div>
        {(currentChannelPosts) ? 
            <div>
                <Header />
                {/* <p>Channel: {currentChannel.title}</p> */}
                {currentChannelPosts.map(post => <PostCard key={post.id} post={post}/>)}
            </div>
            : null
        }
    </div>
  )
}

export default ChannelPage;