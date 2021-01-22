import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Header from './Header'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox'

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
    margin: theme.spacing(0,0,0,2),
  },
  textInputs: {
      display: 'block'
  }
}));

function NewChannelPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const channels = useSelector(state => state.channels.allChannels)
    const posts = useSelector(state => state.posts.allPosts)

    const clearForm = (e) => {
        e.target.firstElementChild.firstElementChild.lastElementChild.firstElementChild.value = null
        e.target.querySelector("#title").value = ''
        e.target.querySelector("#content").value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                title: e.target.querySelector("#title").value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type:'ADD_CHANNEL', channel: data})
            // debugger
            history.push('./channels')
        })
    }
    return (
        <div>
            <Header />
            <div className={classes.topRibbon}>
                Create a channel 
            </div>
            <hr />
            <p>Choose an original name for your new community, already taken names are not allowed.</p>
            <form onSubmit={(e) => handleSubmit(e)}>                
                <input placeholder='Title' id="title" style={{width: 627}} className={classes.textInputs}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewChannelPage