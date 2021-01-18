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
    minWidth: 200,
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

function ReplyCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <React.Fragment>
        
            <Grid item key={props.post.id}>
                <Card className={classes.card}>
                    <div className={classes.cardActions}>
                    <Button onClick={(e) => console.log(e.target)} size='medium' variant="contained" color="primary">
                      <ArrowDropUpIcon />
                    </Button>
                    <Box>{ (props.post.likes) ? props.post.likes.length : 0}</Box>
                    <Button onClick={(e) => console.log(e.target)} size='medium' variant="contained" color="primary" ml={0}>
                      <ArrowDropDownIcon ml={0}/>
                    </Button></div>
                    <CardContent className={classes.cardContent} >
                        <br />
                        <Typography>
                            Content: {props.post.content}
                        </Typography>
                        <Typography>
                            Posting User: {(props.post.user) ? props.post.user.username : currentUser.username}
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
export default ReplyCard;