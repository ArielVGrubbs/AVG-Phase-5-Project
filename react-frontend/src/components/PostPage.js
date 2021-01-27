import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Grid from '@material-ui/core/Grid';

import Header from './Header'
import PostCard from './PostCard';
import ReplyCard from './ReplyCard'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    color: 'black'
  },
  backdrop: {
    backgroundColor: '#363636'
  },
  topRibbon: {
    // display: 'flex',
    width: theme.spacing(110),
    backgroundColor: 'black',
    height: theme.spacing(5),
    margin: 'auto',
  },
  bottomRibbon: {
    // display: 'flex',
    width: theme.spacing(110),
    backgroundColor: '#eeeeee',
    height: '100%',
    margin: 'auto',
    justifyContent: 'center'
  },
  pageIntroText: {
    color: '#D0D0D0',
    fontSize: '14px',
    // marginLeft: theme.spacing(4),
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    display: 'inline-flex'
  },
  textBoxIcon: {
    marginTop: '8px',
    color: '#B7B7B7',
    display: 'inline-flex',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
    float: 'left'
  },
  topSpacer: {
    height: theme.spacing(5),
    width: '100%'
  },
  replySection: {
    
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
        <div className={classes.backdrop}>
          {(currentPost) ? <div>
              {/* <p>Post Page {currentPost.id}</p>  */}
              <div className={classes.topRibbon}>
                <SpeakerNotesIcon fontSize="small" className={classes.textBoxIcon}/>
                <div className={classes.pageIntroText}>
                  {/* <SpeakerNotesIcon fontSize="small" className={classes.textBoxIcon}/> */}
                  {currentPost.title}
                </div>
              </div>
              <div className={classes.bottomRibbon}>
                  <div className={classes.topSpacer}></div>
                  <div className={classes.replySection}>
                      <PostCard key={currentPost.id} post={currentPost} postPage={true}/>
                      Comment as <Link to={`/user/${currentUser.username}`}>{currentUser.username}</Link>
                      <form onSubmit={(e) => handleSubmit(e)} onClick={() => setReplyPost(currentPost)}>
                          <input placeholder='What are your thoughts?' id="content" style={{width: 690, height: 200}}/>
                          <button type="submit">Post</button>
                      </form>
                      <Grid container className={classes.pList} spacing={2}>
                          {(currentPost.posts) ? currentPost.posts.map(post => <ReplyCard key={post.id} post={post} handleSubmit={handleSubmit} setReplyPost={setReplyPost} parentWidth={789.7}/>) : null}
                      </Grid>
                  </div>
              </div>
          </div> : null}
        </div>
    </div>
  )
}

export default PostPage;