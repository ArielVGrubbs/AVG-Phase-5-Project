import React, { useState, useEffect } from 'react';
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

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   card: {
//     minWidth: 200,
//     width: 719.7,
//     // height:450,
//     padding: 5,
//     display: 'flex',
//     // flexDirection: 'column',
//     // justifyContent: 'space-evenly',
//     alignContent: 'center'
//   },
//   cardMedia: {
//     width:150, minHeight:175, margin: 'auto', flex: 1
//   },
//   cardContent: {
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     // justifyContent: 'space-evenly'
//   },
//   cardActions: {
//     display: 'block',
//     marginLeft: theme.spacing(.5),
//     // verticalAlign: 'center'
//     // flexDirection: 'row',
//     // justifyContent: 'space-evenly',
//     // alignContent: 'center'
//   },
//   title: {
//     fontSize: 18, 
//     fontWeight: 'bold',
//     textDecoration: 'none'
//   },
//   price: {
//     color: '#B12704',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   notInStock: {textAlign: 'center'},
//   brandLink: {
//     color: '#212121',
//     textDecoration: 'none'
//   },
//   buttons: {
//     display: 'block',
//     width: 83
//   }
// }));

function ReplyCard(props) {
    let cardWidth = props.parentWidth - 70
    const useStyles = makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        card: {
          width: cardWidth,
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
        }
    }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser)
  const [reply, setReply] = useState(false)

  const currentPost = useSelector(state => state.posts.allPosts).find(post => post.id === props.post.id)
  const [post, setPost] = useState(currentPost)

  useEffect(() => {
    setPost(currentPost)
  }, [currentPost])

  const handleSetReply = () => {
      setReply(!reply)
      props.setReplyPost(post)
  }

  const handleUpVote = (e) => {
    console.log(e.target)
    if(currentUser.dislikes.find(dislike => dislike.post_id === post.id)){
      let dislikeId = currentUser.dislikes.find(dislike => dislike.post_id === post.id).id
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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: post.id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch({type:'LIKE', like:data})
        })
      })
    }else{
      fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: post.id
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
    if(currentUser.likes.find(like => like.post_id === post.id)){
      let likeId = currentUser.likes.find(like => like.post_id === post.id).id
      fetch(`http://localhost:3000/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(likeData => {
        console.log(likeData)
        dispatch({type:'UNLIKE', like:likeData})
        fetch('http://localhost:3000/dislikes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: post.id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch({type:'DISLIKE', dislike:data})
        })
      })
    }else{
      fetch('http://localhost:3000/dislikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: post.id
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
        
            {(post) ? 
            <Grid item key={post.id}>
                <Card className={classes.card}>
                    <div>{(post.user.id !== currentUser.id) ? <div className={classes.cardActions}>
                    <Button onClick={(e) => console.log(e.target)} size='medium' variant="contained" color="primary">
                      <ArrowDropUpIcon onClick={(e) => handleUpVote(e)}/>
                    </Button>
                    <Box>{ (post.likes) ? post.likes.length-post.dislikes.length : 0}</Box>
                    <Button onClick={(e) => console.log(e.target)} size='medium' variant="contained" color="primary" ml={0}>
                      <ArrowDropDownIcon ml={0} onClick={(e) => handleDownVote(e)}/>
                    </Button></div> : null } </div>
                    <CardContent className={classes.cardContent} >
                        <br />
                        <Typography>
                            Content: {post.content}
                        </Typography>
                        <Typography>
                            Posting User: {(post.user) ? post.user.username : currentUser.username}
                        </Typography>
                        <Typography onClick={() => handleSetReply()}>
                            # of replies: {(post.posts) ? post.posts.length : 0}
                        </Typography>
                        {(reply) ? 
                        <form onSubmit={(e) => props.handleSubmit(e)}>
                            <input placeholder='What are your thoughts?' id="content" style={{width: 627, height: 200}}/>
                            <button type="submit">Post</button>
                        </form> : null}
                        {post.posts.map(p => <ReplyCard key={p.id} post={p} handleSubmit={props.handleSubmit} setReplyPost={props.setReplyPost} parentWidth={cardWidth}/>)}
                    </CardContent>
                </Card>
            </Grid>
            : null }
    </React.Fragment>
  )
}
export default ReplyCard;