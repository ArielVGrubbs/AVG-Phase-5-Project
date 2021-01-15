import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../components/PostCard'


const useStyles = makeStyles((theme) => ({
    pList: {
        height: '100%',
        width:'100%',
        display: 'block',
        flexFlow: 'row wrap',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginLeft: theme.spacing(10)
    }
}));


function PostList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts.allPosts)

  return (
    <React.Fragment>
        <Grid container className={classes.pList} spacing={2}>
            {
            posts.map(post => <PostCard key={post.id} post={post}/>)
            }
        </Grid>
    </React.Fragment>
  );
}
export default PostList