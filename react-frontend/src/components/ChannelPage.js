import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from './Header'
import PostCard from './PostCard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    color: 'black'
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
    marginLeft: theme.spacing(33.9),
    marginBottom: theme.spacing(5),
    // marginTop: theme.spacing(1.5),
    // margin: 'auto',
    // cursor: 'pointer',
    border: '1px solid',
    borderColor: '#C3C3C3'
  },
  topRibbon: {
    display: 'flex'
  },
  joinButton: {
      backgroundColor: theme.palette.error.main,
      color: "white",
      display: 'flex',
      marginLeft: theme.spacing(3),
  },
  joinedButton: {
    backgroundColor: "white",
    color: theme.palette.error.main,
    display: 'flex',
    marginLeft: theme.spacing(3),
    // outlineColor: theme.palette.error.main,
    // outlineWidth: theme.spacing(.5)
    borderRadius: '20px',
    border: '1px solid'
    },
    moderatorText: {
        display: 'block',
        width: '90%',
        margin: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        // paddingTop: theme.spacing(2),
        color: '#8B8B8B'
    },
    topBackDrop: {
        width: '100%',
        height: theme.spacing(25),
        backgroundColor: '#0079d3'
    },
    midBackDrop: {
        width: '100%',
        height: theme.spacing(13),
        backgroundColor: 'white'
    },
    bottomBackDrop: {
        width: '100%',
        height: '100%', //theme.spacing(200),
        backgroundColor: '#273c75'
    },
    channelRibbon: {
        marginLeft: theme.spacing(38),
    },
    channelTitle: {
        // marginLeft: theme.spacing(19),
        paddingTop: theme.spacing(2),
        fontSize: '30px',
        fontWeight: 'bold',
        display: 'flex',
    },
    channelUrl: {
        color: '#949494',
        fontSize: '13px',
        marginLeft: theme.spacing(.5)
    },
    pSpacer: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(2),
        backgroundColor: '#273c75',
        height: theme.spacing(2)
    },
    pList: {
        height: '100%',
        width:'100%',
        margin: 'auto',
        display: 'block',
        flexFlow: 'row wrap',
        // paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        // marginLeft: theme.spacing(10)
    }
}));

const ChannelPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const URL = useParams()

    const currentUser = useSelector(state => state.user.currentUser)

    const allChannels = useSelector(state => state.channels.allChannels)
    const posts = useSelector(state => state.posts.allPosts)
    const [allPosts, setAllPosts] = useState(posts)

    const userFetch = useSelector(state => state.user.userFetch)

    const stateJoined = useSelector(state => state.user.joined)
    // const [joined, setJoined] = useState(stateJoined)

    // useEffect(() => {
    //     setJoined(stateJoined)
    // }, [stateJoined])

    const [moderator, setModerator] = useState(false)

    let currentChannelPosts = false
    let currentChannel

    if(userFetch){
        currentChannel = allChannels.find(channel => channel.title === URL.channel_title)
        // debugger
        if(currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id) && stateJoined === false){
            console.log("I'm an asshole if statement")
            dispatch({type: 'SET_JOINED', joined: true})
        } else if(!currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id) && stateJoined === true){
            dispatch({type: 'SET_JOINED', joined: false})
        }
        const channelPosts = allPosts.filter(post => post.postable_type === "Channel")
        currentChannelPosts = channelPosts.filter(post => post.postable_id === currentChannel.id)
    }

    if(currentChannel){
        // debugger
        if(currentChannel.channel_owners.find(c_o => c_o.user_id === currentUser.id) && moderator === false){
            setModerator(true)
        } else if(!currentChannel.channel_owners.find(c_o => c_o.user_id === currentUser.id) && moderator === true){
            // debugger
            setModerator(false)
        }
    }
    
    const handleJoin = (e) => {
        console.log(e.target)
        if (stateJoined){
            // dispatch({type: 'SET_JOINED', joined: false})
            // setJoined(false)
            let chanMem = currentChannel.channel_members.find(c_m => c_m.user_id === currentUser.id)
            fetch(`http://localhost:3000/channel_members/${chanMem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // dispatch({type: 'SET_JOINED', joined: false})
                console.log(`You have successfully left /r/${currentChannel.title}'s membership.`)
            })
        } else {
            // dispatch({type: 'SET_JOINED', joined: true})
            // setJoined(true)
            fetch(`http://localhost:3000/channel_members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                },
                body: JSON.stringify({
                    channel_id: currentChannel.id,
                    user_id: currentUser.id
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // dispatch({type: 'SET_JOINED', joined: true})
                console.log(`You have successfully become a member of /r/${currentChannel.title}.`)
            })
        }

    }

    const removePost = (post) => {
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    return (
        <div>
            {(currentChannelPosts) ? 
                <div>
                    <Header />
                    <div className={classes.topBackDrop}></div>
                    {(currentChannel) ? <div>
                        <div className={classes.midBackDrop}>
                            <div className={classes.channelRibbon}>
                                <div className={classes.channelTitle}>
                                    {currentChannel.title}
                                    {(stateJoined) ? <Button variant="outlined" className={classes.joinedButton} onClick={(e) => handleJoin(e)} >Joined</Button> : <Button variant="contained" className={classes.joinButton} disableElevation onClick={(e) => handleJoin(e)}>Join</Button> }
                                </div>
                                
                                <div className={classes.channelUrl}>
                                    readit/{currentChannel.title}
                                </div>
                            </div>
                        </div>
                    </div> : null}
                    
                    
                    <div className={classes.bottomBackDrop}>
                        <p className={classes.pSpacer}></p>
                        <div>
                            {
                            (moderator) 
                            ? 
                            <Card className={classes.card} variant="outlined">
                                <div className={classes.moderatorText}>
                                    You are a moderator of this channel, and as such may delete posts that do not adhere to the channel's rules.
                                </div> 
                            </Card>
                            : 
                            null 
                            }
                        </div>
                        <Grid container className={classes.pList} spacing={2}>
                            {currentChannelPosts.map(post => <PostCard key={post.id} post={post} moderator={moderator} deletePost={removePost} channel={currentChannel}/>)}
                        </Grid>
                        
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default ChannelPage;