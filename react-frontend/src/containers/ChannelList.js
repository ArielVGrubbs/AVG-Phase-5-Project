import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../components/PostCard'
import Header from '../components/Header'
// import { Link } from '@material-ui/core';


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


function ChannelList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let channels = useSelector(state => state.channels.allChannels)
//   channels.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : 1)
  // products.sort((a, b) => (a.price > b.price) ? 1 : -1)

  return (
    <React.Fragment>
        <Header />
        <Grid container className={classes.pList} spacing={2}>
            {
            channels.map(channel => <Link to={`channels/${channel.title}`}>{channel.title}</Link>)
            }
        </Grid>
    </React.Fragment>
  );
}
export default ChannelList