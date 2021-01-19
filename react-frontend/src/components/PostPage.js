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

const PostPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.currentUser)

    const URL = useParams()
    const allPosts = useSelector(state => state.posts.allPosts)
    //   debugger
    const currentPost = allPosts.find(post => post.id === parseInt(URL.post_id))
    const [replyPost, setReplyPost] = useState(currentPost)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                content: e.target.firstElementChild.value,
                postable_type: 'Post',
                postable_id: replyPost.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type: 'ADD_REPLY', reply: data})
            // debugger
        })
    }

  return (
    <div>
        <Header />
        {(currentPost) ? <div>
            <p>Post Page {currentPost.id}</p> 
            <PostCard key={currentPost.id} post={currentPost}/>
            Comment as <Link to={`/user/${currentUser.username}`}>{currentUser.username}</Link>
            <form onSubmit={(e) => handleSubmit(e)} onClick={() => setReplyPost(currentPost)}>
                <input placeholder='What are your thoughts?' id="content" style={{width: 627, height: 200}}/>
                <button type="submit">Post</button>
            </form>
            {currentPost.posts.map(post => <ReplyCard key={post.id} post={post} handleSubmit={handleSubmit} setReplyPost={setReplyPost} parentWidth={719.7}/>)}
        </div> : null}
    </div>
  )
}

export default PostPage;