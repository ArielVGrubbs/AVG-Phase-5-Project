import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Card from '@material-ui/core/Card';

import PostCard from '../components/PostCard'
import Header from '../components/Header'

// import { Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cList: {
        height: '100%',
        width:'100%',
        display: 'block',
        flexFlow: 'row wrap',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        // marginLeft: theme.spacing(10)
    },
    card: {
      // minWidth: 200,
      width: 717,
      // height:450,
      padding: 0,
      display: 'block',
      // flexDirection: 'column',
      // justifyContent: 'space-evenly',
      alignContent: 'center',
      // marginLeft: theme.spacing(33),
      margin: 'auto',
      marginBottom: theme.spacing(0),
      // marginTop: theme.spacing(1.5),
      // margin: 'auto',
      // cursor: 'pointer',
      border: '1px solid',
      borderColor: '#C3C3C3',
      borderRadius: '0px',
      borderTop: '0px'
    },
    topCard: {
      // minWidth: 200,
      width: 717,
      // height:450,
      padding: 0,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      display: 'block',
      // flexDirection: 'column',
      // justifyContent: 'space-evenly',
      alignContent: 'center',
      // marginLeft: theme.spacing(33),
      margin: 'auto',
      // marginBottom: theme.spacing(5),
      marginTop: theme.spacing(1.5),
      // margin: 'auto',
      // cursor: 'pointer',
      border: '1px solid',
      borderColor: '#C3C3C3',
      borderRadius: '0px',
      backgroundColor: '#EBECED'
    },
    divider: {
      borderTop: '1px solid',
      borderBottom: '0px solid',
      borderLeft: '0px solid',
      borderColor: '#E1E1E1',
      width: '120%',
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(2),
      // display: 'block',
    },
    communityContainer: {
      // height: theme.spacing(10),
      marginTop: theme.spacing(1),
      // marginBottom: theme.spacing(1),
      // display: 'flex',
      color: 'black',
    },
    communityLink: {
      marginLeft: theme.spacing(4),
      // display: 'block',
      color: 'black',
      textDecoration: 'none'
    },
    channelNumber: {
      display: 'inline-flex',
      width: '15px',
      // marginRight: '5px',
      // marginBlockStart: '0px',
      // marginBlockEnd: '0px',
      // marginInlineStart: '1px',
      // marginInlineEnd: '1px'
    },
    cardHeader: {
      marginLeft: theme.spacing(2),
    },
    communityArrow: {
      marginRight: theme.spacing(0.6),
      color: '#46D160'
      // marginLeft: theme.spacing(0.5),
      // paddingTop: theme.spacing(.5)
    },
    arrowContainer: {
      display: 'inline-flex',
      // paddingTop: theme.spacing(.5)
    }
}));


function ChannelList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let channels = useSelector(state => state.channels.allChannels)
  channels.sort((a, b) => (a.channel_members.length > b.channel_members.length) ? -1 : 1)
  // products.sort((a, b) => (a.price > b.price) ? 1 : -1)

  return (
    <React.Fragment>
        <Header />
        <Grid container className={classes.cList} spacing={2}>
            <Card className={classes.topCard} variant="outlined">
              <div className={classes.cardHeader}>
                Most Popular Communities
              </div>
            </Card>
            <Card className={classes.card} variant="outlined">
            {
            channels.map(channel => 
              <div className={classes.communityContainer}>
                <Link to={`channels/readit/${channel.title}`} className={classes.communityLink}>
                  <div className={classes.channelNumber}>
                    {channels.indexOf(channel)+1}
                  </div>
                  <div className={classes.arrowContainer}>
                    <ArrowDropUpIcon className={classes.communityArrow}/>
                  </div>
                  /{channel.title}
                </Link>
                <br />
                <hr className={classes.divider}/>
              </div>)
            }
            </Card>
        </Grid>
    </React.Fragment>
  );
}
export default ChannelList