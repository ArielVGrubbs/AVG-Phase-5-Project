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

    const currentUser = useSelector(state => state.user.currentUser)

    const URL = useParams()
    // const allPosts = useSelector(state => state.posts.allPosts)

    // const currentPost = allPosts.find(post => post.id === parseInt(URL.post_id))
    // const [replyPost, setReplyPost] = useState(currentPost)

    const allChannels = useSelector(state => state.channels.allChannels)

  return (
    <div>
        <Header />
        
    </div>
  )
}

export default ChannelPage;