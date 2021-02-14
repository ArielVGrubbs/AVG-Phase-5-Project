import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChildCareIcon from '@material-ui/icons/ChildCare';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import AndroidIcon from '@material-ui/icons/Android';

import Header from './Header';
import PostCard from './PostCard'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
    },
    card: {
        // minWidth: 200,
        width: 719.7,
        // height:450,
        padding: 0,
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
        alignContent: 'center',
        marginLeft: theme.spacing(33),
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(3),
        // margin: 'auto',
        // cursor: 'pointer',
        border: '1px solid',
        borderColor: '#C3C3C3'
    },
    altCard: {
        // minWidth: 200,
        width: 719.7,
        // height:450,
        padding: 0,
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
        alignContent: 'center',
        marginLeft: theme.spacing(33),
        marginBottom: theme.spacing(3),
        // marginTop: theme.spacing(3),
        // margin: 'auto',
        // cursor: 'pointer',
        border: '0px solid',
        // borderColor: '#C3C3C3'
    },
    topRibbon: {
        display: 'flex'
    },
    userActionsButtons: {
        backgroundColor: '#0079d3',
        color: 'white',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: theme.spacing(3),
        borderRadius: theme.spacing(1),
        border: '0px solid',
        borderRadius: '15px'
    },
    pList: {
        height: '100%',
        width:'100%',
        display: 'block',
        flexFlow: 'row wrap',
        // paddingTop: theme.spacing(3),
        // paddingBottom: theme.spacing(3),
        // marginLeft: theme.spacing(10)
    },
    gridItem: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    avatar: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        color: 'white',
        textDecoration: 'none',
        backgroundColor: theme.palette.info.main,
        marginRight: theme.spacing(1),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    userButtons: {
        backgroundColor: '#0079d3',
        color: 'white',
        // marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
        // margin: 'auto',
        marginBottom: theme.spacing(1),
        borderRadius: '20px'
    },
    userName: {
        fontSize: '20px',
        marginTop: theme.spacing(1.4),
        marginLeft: theme.spacing(2)
    },
    postsCounter: {
        marginLeft: theme.spacing(2),
        display: 'flex',
        marginTop: theme.spacing(2.5)
    },
    textDivider: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        // marginTop: theme.spacing(.6),
        color: 'white',
        fontSize: '10px'
    },
    userActionForm: {
        marginLeft: theme.spacing(5)
    },
    hintText: {
        color: '#AEAEAE',
        marginBottom: theme.spacing(1)
    },
    emailText: {
        marginLeft: theme.spacing(2),
        fontSize: '13px',
    },
    userButtonsContainer: {
        margin: theme.spacing(2,0,2,0)
    }
}));

const UserPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const URL = useParams()

    const currentUser = useSelector(state => state.user.currentUser)
    const allChannels = useSelector(state => state.channels.allChannels)

    const users = useSelector(state => state.user.allUsers)
    const [allUsers, setAllUsers] = useState(users)

    const posts = useSelector(state => state.posts.allPosts)
    const [allPosts, setAllPosts] = useState(posts)

    const [showLiked, setShowLiked] = useState(false)

    const [showModerator, setShowModerator] = useState(false)
    const [showBan, setShowBan] = useState(false)

    // const likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === currentUser.id)) ? true : false)
    let likedPosts
    let userPosts
    let currentUsersChannels
    let user

    const userFetch = useSelector(state => state.user.userFetch)

    if (userFetch){
        user = allUsers.find(u => u.username === URL.username)
        likedPosts = allPosts.filter(post => (post.likes.find(like => like.user_id === user.id)) ? true : false)
        // console.log(user)
        userPosts = allPosts.filter(post => post.user.username === user.username)

        currentUsersChannels = allChannels.filter(ch => ch.channel_owners.find(c_o => c_o.user_id === currentUser.id) && ch.channel_members.find(c_m => c_m.user_id === user.id))
    }

    useEffect(() => {
        setAllPosts(posts)
    }, [posts])

    const removePost = (post) => {
        setAllPosts(allPosts.filter(p => p.id !== post.id))
    }

    const showLikedPosts = () => {
        setShowLiked(!showLiked)
    }

    const handleMakeModerator = (e) => {
        e.preventDefault()
        console.log(e.target)

        let channel = allChannels.find(ch => ch.title === e.target.firstElementChild.value)
        fetch(`http://localhost:3000/channel_owners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                user_id: user.id,
                channel_id: channel.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type: 'ADD_MODERATOR', channelOwner: data})
        })
    }

    const handleBanUser = (e) => {
        e.preventDefault()
        console.log(e.target)

        let channel = allChannels.find(ch => ch.title === e.target.firstElementChild.value)
        console.log(allUsers)
        console.log(userFetch)
        if(user.channel_members.find(c_m => c_m.channel_id === channel.id)){
            let channelMember = user.channel_members.find(c_m => c_m.channel_id === channel.id)
            fetch(`http://localhost:3000/channel_members/${channelMember.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({type: 'BAN_USER', channelMember: channelMember, channelTitle: channel.title})
            })
        }
    }

    return (
        <div>{(userFetch) ? 
            <div>
            
                <Header />

                <Card className={classes.card} variant="outlined">
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <AndroidIcon fontSize='large'/>
                    </Avatar>
                    <div>
                        <div className={classes.userName}>
                            u/{URL.username}
                        </div>
                        <div className={classes.emailText}>
                            {user.email}
                        </div>
                        <div className={classes.postsCounter}>
                            Posts: {userPosts.length} <div className={classes.textDivider}>○</div> Channels: {(user) ? user.channel_members.length : null}
                        </div>
                        {/* fix this later */}
                        {
                        (localStorage.getItem('currentUserUsername') !== URL.username) 
                        ? 
                        <div className={classes.userButtonsContainer}>
                            <Button onClick={(e) => setShowModerator(!showModerator)} className={classes.userButtons} color="primary" variant="contained" disableElevation>Make Moderator</Button>
                            <Button onClick={(e) => setShowBan(!showBan)} className={classes.userButtons} color="primary" variant="contained" disableElevation>Ban User From Channel</Button>
                            <Button onClick={() => showLikedPosts()} className={classes.userButtons} color="primary" variant="contained" disableElevation>Liked Posts</Button>
                        </div> 
                        : 
                        <p>
                            <Button onClick={() => showLikedPosts()} className={classes.userButtons} color="primary" variant="contained" disableElevation>Liked Posts</Button>
                        </p> 
                        }
                    </div>
                </Card>
                <Card className={classes.altCard} variant="outlined">
                    {(showModerator) ? 
                        <div className={classes.userActionForm}>
                            <form onSubmit={(e) => handleMakeModerator(e)}>
                                Select a channel you moderate and wish to make this user a moderator of:
                                <select>
                                    {currentUsersChannels.map(cUC => <option key={cUC.id}>{cUC.title}</option>)}
                                </select>
                                <button type="Submit" className={classes.userActionsButtons} >Submit</button>
                            </form>
                            {
                                (currentUsersChannels.length === 0) 
                                ?
                                <div className={classes.hintText}>
                                    *If there isn't any options then they aren't a member of any channels you moderate
                                </div>
                                :
                                null
                            }
                        </div> : null}
                </Card>
                <Card className={classes.altCard} variant="outlined">
                    {(showBan) ? 
                        <div className={classes.userActionForm}>
                            <form onSubmit={(e) => handleBanUser(e)}>
                                Select a channel you moderate and wish to ban this user from:
                                <select>
                                    {currentUsersChannels.map(cUC => <option key={cUC.id}>{cUC.title}</option>)}
                                </select>
                                <button type="Submit" className={classes.userActionsButtons} >Submit</button>
                            </form>
                            {
                                (currentUsersChannels.length === 0) 
                                ?
                                <div className={classes.hintText}>
                                    *If there isn't any options then they aren't a member of any channels you moderate
                                </div>
                                :
                                null
                            }
                        </div> : null}
                </Card>
                {/* <p onClick={() => showLikedPosts()}>Show Liked Posts?</p> */}
                <div>
                    {
                    (currentUser.username === URL.username)
                    ?
                    <Grid container className={classes.pList} spacing={2}>
                        {
                        (!showLiked) 
                        ? 
                        userPosts.map(p => <PostCard key={p.id} deletePost={removePost} post={p} userPage={true} className={classes.gridItem}/>)
                        : 
                        likedPosts.map(p => <PostCard key={p.id} post={p} className={classes.gridItem}/>)
                        }
                    </Grid> 
                    : 
                    <Grid container className={classes.pList} spacing={2}>
                        {
                        (!showLiked) 
                        ? 
                        userPosts.map(p => <PostCard key={p.id} post={p} userPage={false} className={classes.gridItem}/>) 
                        : 
                        likedPosts.map(p => <PostCard key={p.id} post={p} className={classes.gridItem}/>)
                        }
                    </Grid>
                    }
                </div>
                {/* {(!showLiked) ? userPosts.map(p => <PostCard key={p.id} deletePost={removePost} post={p} userPage={true}/>) : likedPosts.map(p => <PostCard key={p.id} post={p} />)} */}
            </div> : null }
        </div>
    )
}

export default UserPage;