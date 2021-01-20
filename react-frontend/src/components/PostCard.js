import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {useDispatch} from 'react-redux'
// import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  card: {
    // minWidth: 200,
    width: 719.7,
    // height:450,
    padding: 5,
    display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-evenly',
    alignContent: 'center'
  },
  cardMedia: {
    width:150, minHeight:175, margin: 'auto', flex: 1
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(10)
    // justifyContent: 'space-evenly'
  },
  cardActions: {
    display: 'block',
    marginLeft: theme.spacing(.5),
    // verticalAlign: 'center'
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignContent: 'center'
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
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
    width: 83
  },
  titleLink: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser)

  const [editForm, setEditForm] = useState(false)
  const [formTitle, setFormTitle] = useState(props.post.title)
  const [formContent, setFormContent] = useState(props.post.content)

  const handleStartEdit = (e) => {
    setEditForm(true)
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
        debugger
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
        dispatch({type: 'UNLIKE', like: likeData})
        // debugger
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
        
            <Grid item key={props.post.id}>
                <Card className={classes.card}>
                    {(props.userPage) ? 
                      <div className={classes.cardActions}>
                      <Button onClick={(e) => handleStartEdit(e)} size='medium' variant="contained" color="primary" className={classes.buttons}>
                        Edit
                      </Button>
                      <br />
                      <Button onClick={() => handleDelete()} size='medium' variant="contained" color="primary" ml={0}>
                        Delete
                      </Button>
                      <Box>Likes: {(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}</Box>
                      </div> : 
                    <div className={classes.cardActions}> 
                      {(props.post.user.id !== currentUser.id) ? <div>
                        <Button size='medium' variant="contained" color="primary">
                          <ArrowDropUpIcon onClick={(e) => handleUpVote(e)}/>
                        </Button>
                        <Box>{(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}</Box>
                        <Button size='medium' variant="contained" color="primary" ml={0}>
                          <ArrowDropDownIcon ml={0} onClick={(e) => handleDownVote(e)}/>
                        </Button>
                      </div> : 
                      <Box>Likes: {(props.post.likes) ? props.post.likes.length-props.post.dislikes.length : 0}</Box> }
                    </div>}
                    <CardContent className={classes.cardContent} >
                        <Typography>
                            Channel: {(props.post.postable) ? props.post.postable.title : null}
                        </Typography>
                        <br />
                        {(!editForm) ? <div><Typography>
                            <Link to={`/posts/${props.post.id}`} className={classes.titleLink}>Title: {formTitle}</Link>
                        </Typography>
                        <Typography>
                            Content: {formContent}
                        </Typography></div> : 
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                          <input placeholder='Title' id="title" style={{width: 600}} value={formTitle} onChange={(e) => handleFormChange(e)}/>
                          <input placeholder='Text' id="content" style={{width: 600, height: 165}} value={formContent} onChange={(e) => handleFormChange(e)}/>
                          <button type="submit">Post</button>
                        </form>}
                        <Typography>
                            <Link to={`/user/${props.post.user.username}`}>Posting User: {(props.post.user) ? props.post.user.username : currentUser.username}</Link>
                        </Typography>
                        <Typography>
                            # of replies: {(props.post.posts) ? props.post.posts.length : 0}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
    </React.Fragment>
  )
}
export default PostCard;