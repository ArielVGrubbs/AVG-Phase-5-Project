import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';

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
  }
}));

function NewPostPage() {
    const classes = useStyles()

    const channels = useSelector(state => state.channels.allChannels)

    const handleSubmit = (e) => {
        e.preventDefault()
        debugger
        let channel = channels.find(c => c.title === e.target.firstElementChild.firstElementChild.lastElementChild.firstElementChild.value)
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                postable_type: "Channel",
                postably_id: channel.id,
                title: e.target.querySelector("#title").value,
                content: e.target.querySelector("#content").value,
                user_id: localStorage.getItem('auth_key')
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    return (
        <div>
            <Header />
            <div className={classes.topRibbon}>
                Create a post <p className={classes.topRibbon}>drafts</p>
            </div>
            <hr />
            <form onSubmit={(e) => handleSubmit(e)}>
                <Autocomplete
                    id="combo-box-demo"
                    options={channels}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Choose a community" variant="outlined" />}
                />
                <input placeholder='Title' id="title" style={{width: 627}}/>
                <input placeholder='Text' id="content" style={{width: 627, height: 200}}/>
                <button type="submit">Post</button>
                <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </form>
        </div>
    )
}

export default NewPostPage