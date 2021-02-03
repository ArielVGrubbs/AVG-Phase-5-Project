import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function PostCard(props) {

  const useStyles = makeStyles((theme) => {
    let marginDeterminer
    let borderRadiusDeterminer
    if(props.postPage){
      marginDeterminer = theme.spacing(0,0,0,10)
      borderRadiusDeterminer = '0px'
    } else {
      marginDeterminer = 'auto'
      borderRadiusDeterminer = '5px'
    }
    return ({
    icon: {
      marginRight: theme.spacing(2),
    },
    card: {
      width: 719.7,
      padding: 0,
      display: 'flex',
      alignContent: 'center',
      margin: marginDeterminer,
      marginTop: theme.spacing(0),
      cursor: 'pointer',
      border: '1px solid',
      borderColor: '#DADADA',
      borderRadius: borderRadiusDeterminer
    },
    cardMedia: {
      width:150, minHeight:175, margin: 'auto', flex: 1
    },
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(10),
      marginLeft: theme.spacing(.8),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0)
    },
    cardActions: {
      display: 'block',
      backgroundColor: '#F8F8F8',
      cursor: 'auto'
    },
    title: {
      fontSize: 18, 
      color: '#222222',
      textDecoration: 'none'
    },
    price: {
      color: '#B12704',
      fontSize: 17,
      fontWeight: 'bold',
    },
    notInStock: {textAlign: 'center'},
    brandLink: {
      color: '#212121',
      textDecoration: 'none'
    },
    buttons: {
      display: 'block',
      width: 83,
      backgroundColor: '#0079d3',
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    altButtons: {
      backgroundColor: '#0079d3',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    titleLink: {
      color: '#222222',
      textDecoration: 'none',
      fontSize: '18px'
    },
    likeArrow: {
      color: '#848484',
      cursor: 'pointer'
    },
    homeSelfLikeArrow: {
      color: '#848484',
    },
    likeCounter: {
      marginLeft: theme.spacing(1.5),
      marginBottom: theme.spacing(.7),
      cursor: 'initial'
    },
    channelUrl: {
      display: 'flex'
    },
    postedBy: {
      color: '#A7A7A7',
      textDecoration: 'none',
      marginLeft: theme.spacing(.5)
    },
    postedByLink: {
      color: '#A7A7A7',
      textDecoration: 'none',
    },
    commentsIcon: {
      fontSize: '15px',
      marginRight: theme.spacing(.5)
    },
    commentsText: {
      color: '#A7A7A7',
      paddingBottom: theme.spacing(0),
      paddingTop: theme.spacing(5),
      display: 'inline-flex'
    },
    saveIcon: {
      fontSize: '18px',
    },
    selfLikeCounter: {
      marginLeft: theme.spacing(1.5),
      marginBottom: theme.spacing(.7),
      marginTop: theme.spacing(4.8),
      cursor: 'auto'
    },
    postContent: {
      color: '#626262',
      fontSize: '15px'
    },
    hiddenText: {
      color: '#F8F8F8'
    },
    altHiddenText: {
      color: '#F8F8F8',
      marginTop: theme.spacing(1.8)
    },
    homeSelfLikeCounter: {
      marginLeft: theme.spacing(.7),
      marginBottom: theme.spacing(.7),
      marginTop: theme.spacing(2),
      cursor: 'auto',
      color: '#848484',
    },
    deletePostButton: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(11),
      borderRadius: '20px',
      backgroundColor: theme.palette.error.main
    },
    submitButton: {
      marginLeft: theme.spacing(62.3),
      marginBottom: theme.spacing(1.7),
      marginTop: theme.spacing(1),
      height: theme.spacing(3.8),
      width: theme.spacing(9),
      borderRadius: '25px',
      border: '0px solid',
      backgroundColor: '#0079d3',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    textInputs: {
      display: 'block',
      fontFamily: 'Arial',
      margin: theme.spacing(1.7,0,.5,1.7),
      borderColor: '#E5E5E5',
      border: '1px solid'
    },
  })});

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser)

  const [editForm, setEditForm] = useState(false)
  const [formTitle, setFormTitle] = useState(props.post.title)
  const [formContent, setFormContent] = useState(props.post.content)

  const handleStartEdit = (e) => {
    setEditForm(!editForm)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/posts/${props.post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      },
      body: JSON.stringify({
        title: formTitle,
        content: formContent
      })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // debugger
        dispatch({type:'UPDATE_POST', post: data})
        setEditForm(false)
    })
  }

  const handleDelete = () => {
    fetch(`http://localhost:3000/posts/${props.post.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch({type:'DELETE_POST', post:props.post})
    props.deletePost(props.post)
  }

  const handleFormChange = (e) => {
    if (e.target.id === 'title'){
      setFormTitle(e.target.value)
    } else {
      setFormContent(e.target.value)
    }
  }

  // const handleContentChange = (e) => {
  //   setFormContent(e.target.value)
  // }
  const handleUpVote = (e) => {
    console.log(e.target)
    if(currentUser.dislikes.includes(dislike => dislike.post_id === props.post.id)){
      let dislikeId = currentUser.dislikes.find(dislike => dislike.post_id === props.post.id).id
      //custom route on backend
      //errror: chekc return data
      fetch(`http://localhost:3000/dislikes/${dislikeId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(dislikeData => {
        console.log(dislikeData)
        dispatch({type:'UNDISLIKE', dislike:dislikeData})
        fetch('http://localhost:3000/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: props.post.id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch({type:'LIKE', like:data})
        })
      })
    } else {
      fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Key': localStorage.getItem('auth_key')
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: props.post.id
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({type:'LIKE', like:data})
      })
    }
  }

  const handleDownVote = (e) => {
    console.log(e.target)
    if(currentUser.likes.find(like => like.post_id === props.post.id)){
      let likeId = currentUser.likes.find(like => like.post_id === props.post.id).id
      debugger
      fetch(`http://localhost:3000/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Auth-Key': localStorage.getItem('auth_key')
        }
      })
      .then(res => res.json())
      .then(likeData => {
        console.log(likeData)
        debugger
        dispatch({type: 'UNLIKE', like: likeData})
        fetch('http://localhost:3000/dislikes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: props.post.id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch({type:'DISLIKE', dislike:data})
          // debugger
        })
      })
    } else {
      fetch('http://localhost:3000/dislikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Key': localStorage.getItem('auth_key')
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: props.post.id
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({type:'DISLIKE', dislike:data})
      })
    }
  }

  return (
    <React.Fragment>
      <Grid item key={props.post.id} >
                <Card className={classes.card} variant="outlined">
                    {(props.userPage) ? 
                      <div className={classes.cardActions}>
                      <Button onClick={(e) => handleStartEdit(e)} size='medium' variant="contained" color="primary" className={classes.buttons}>
                        Edit
                      </Button>
                      <br />
                      <Button onClick={() => handleDelete()} size='medium' variant="contained" color="primary" ml={0} className={classes.altButtons}>
                        Delete
                      </Button>
                      <Box className={classes.homeSelfLikeCounter}>Likes: {(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}</Box>
                      </div> : 
                    <div className={classes.cardActions}> 
                      {(props.post.user.id !== currentUser.id) ? <div>
                        <ArrowDropUpIcon onClick={(e) => handleUpVote(e)} fontSize='large' className={classes.likeArrow}/>
                        <Box className={classes.likeCounter}>{(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}</Box>
                        <ArrowDropDownIcon ml={0} onClick={(e) => handleDownVote(e)} fontSize='large' className={classes.likeArrow}/>
                        
                      </div> : 
                      <div>
                        <Box className={classes.selfLikeCounter}>
                          {(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}
                          <div className={classes.altHiddenText}>
                            hel
                          </div>
                        </Box>
                      </div>}
                    </div>}
                    <div className={classes.cardContent} >
                        <Typography className={classes.channelUrl}>
                            {(props.post.postable_type === 'Channel') 
                            ? 'r/' : null }
                            {(props.post.postable) 
                            ? props.post.postable.title
                            : null} 
                            <div className={classes.postedBy}>
                              ○ Posted by: u/
                              <Link to={`/u/${props.post.user.username}`} className={classes.postedByLink}>
                                {(props.post.user) ? props.post.user.username : currentUser.username}
                              </Link>
                            </div>
                        </Typography>
                        {/* <Typography >
                          Posted by: <Link to={`/user/${props.post.user.username}`}>{(props.post.user) ? props.post.user.username : currentUser.username}</Link>
                        </Typography> */}
                        <br />
                        {(!editForm) ? <div><Typography >
                            <Link to={`/posts/${props.post.id}`} className={classes.titleLink}>{formTitle}</Link>
                        </Typography>
                        <Typography className={classes.postContent}>
                            {formContent}
                        </Typography></div> : 
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                          {(formTitle) ? 
                            <input placeholder='Title(max 300)' value={formTitle} onChange={(e) => setFormTitle(e.target.value)} id="title" style={{width: 550}} className={classes.textInputs}/>
                            : null
                          }
                          
                          <textarea id="content" placeholder="Text(optional)" cols='80' rows='8' className={classes.textInputs} value={formContent} onChange={(e) => setFormContent(e.target.value)}></textarea>
                          <button type="submit" className={classes.submitButton}>Edit</button>
                        </form>}
                        <Typography className={classes.commentsText}>
                            <ChatBubbleIcon fontSize="small" className={classes.commentsIcon}/>{(props.post.posts) ? props.post.posts.length : 0} Comments 
                        </Typography>
                        
                    </div>
                    <div>
                      {(props.moderator) ? 
                      <div>
                        <br />
                        <Button onClick={() => handleDelete()} size='medium' variant="contained" color="primary" ml={0} className={classes.deletePostButton}>
                          Delete
                        </Button>
                      </div>
                      : null
                      }
                    </div>
                </Card>
      </Grid>
    </React.Fragment>
  )
}
export default PostCard;