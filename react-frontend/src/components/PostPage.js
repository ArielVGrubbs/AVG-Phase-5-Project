import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const PostPage = (props) => {
  const classes = useStyles();

  const currentUser = useSelector(state => state.user.currentUser)

  const URL = useParams()
  const allPosts = useSelector(state => state.posts.allPosts)
//   debugger
  const currentPost = allPosts.find(post => post.id === parseInt(URL.post_id))

  return (
    <div>
        <Header />
        {(currentPost) ? <div>
            <p>Post Page {currentPost.id}</p> 
            <PostCard key={currentPost.id} post={currentPost}/>
            Comment as <Link to={`/user/${currentUser.username}`}>{currentUser.username}</Link>
            <form>
                <input placeholder='What are your thoughts?' id="content" style={{width: 627, height: 200}}/>
                <button type="submit">Post</button>
            </form>
            {currentPost.posts.map(post => <ReplyCard key={post.id} post={post}/>)}
        </div> : null}
    </div>
  )
}

export default PostPage;