import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Header from './Header'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 }
]

const useStyles = makeStyles((theme) => ({
  topRibbon: {
    display: 'flex',
    margin: theme.spacing(5,0,0,33),
  },
  topRibbonDivider: {
    width: 717,
    padding: 0,
    display: 'block',
    alignContent: 'center',
    marginLeft: theme.spacing(33),
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    border: '0.2px solid',
    borderColor: '#FFFFFF'
  },
  textInputs: {
      display: 'block',
      fontFamily: 'Arial',
      margin: theme.spacing(1.7,0,.5,1.7),
      borderColor: '#E5E5E5',
      border: '1px solid'
  },
  autocompleteSearch: {
      backgroundColor: 'white',
      marginLeft: theme.spacing(33),
      borderRadius: '5px'
  },
  card: {
    width: 717,
    padding: 0,
    display: 'block',
    alignContent: 'center',
    marginLeft: theme.spacing(33),
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(1.5),
    border: '1px solid',
    borderColor: '#C3C3C3'
  },
  submitButton: {
      marginLeft: theme.spacing(78.8),
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
  }
}));

function NewPostPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.currentUser)

    const allChannels = useSelector(state => state.channels.allChannels)
    let channels = allChannels.filter(ch => ch.channel_members.find(c_m => c_m.user_id === currentUser.id))
    const posts = useSelector(state => state.posts.allPosts)

    const clearForm = (e) => {
        e.target.parentElement.parentElement.querySelector('#combo-box-demo').value = null
        e.target.querySelector("#title").value = ''
        e.target.querySelector("#content").value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let channel = channels.find(c => c.title === e.target.parentElement.parentElement.querySelector('#combo-box-demo').value)
        // debugger
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                postable_type: "Channel",
                postable_id: channel.id,
                title: e.target.querySelector("#title").value,
                content: e.target.querySelector("#content").value,
                user_id: localStorage.getItem('auth_key')
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(posts)
            data.postable = {title:e.target.parentElement.parentElement.querySelector('#combo-box-demo').value}
            dispatch({type:'ADD_POST', post: data})
            clearForm(e)
            history.push('/dashboard')
        })
    }
    return (
        <div>
            <Header />
            <div className={classes.topRibbon}>
                Create a post
            </div>
            <Card className={classes.topRibbonDivider} variant="outlined"></Card>
            <Autocomplete
                        id="combo-box-demo"
                        options={channels}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        className={classes.autocompleteSearch}
                        renderInput={(params) => <TextField {...params} label="Choose a community" variant="outlined"/>}
            />
            <Card className={classes.card} variant="outlined">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Title(max 300)' id="title" style={{width: 683}} className={classes.textInputs}/>
                    <textarea id="content" placeholder="Text(optional)" cols='100' rows='8' className={classes.textInputs}></textarea>
                    <button type="submit" className={classes.submitButton}>Post</button>
                </form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Title(max 300)' id="title" style={{width: 683}} className={classes.textInputs}/>
                    <textarea id="content" placeholder="Text(optional)" cols='100' rows='8' className={classes.textInputs}></textarea>
                    <button type="submit" className={classes.submitButton}>Post</button>
                </form>
            </Card>

        </div>
    )
}

export default NewPostPage