import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Header from './Header'

import { makeStyles } from '@material-ui/core/styles';
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
    //   topRibbonDivider: {
    //     width: 717,
    //     padding: 0,
    //     display: 'block',
    //     alignContent: 'center',
    //     marginLeft: theme.spacing(33),
    //     marginBottom: theme.spacing(1.5),
    //     marginTop: theme.spacing(1.5),
    //     border: '0.2px solid',
    //     borderColor: '#FFFFFF'
    //   },
      textInputs: {
          display: 'block',
          fontFamily: 'Arial',
          margin: theme.spacing(1.7,0,.5,1.7),
          borderColor: '#E5E5E5',
          border: '1px solid'
      },
    //   autocompleteSearch: {
    //       backgroundColor: 'white',
    //       marginLeft: theme.spacing(33),
    //       borderRadius: '5px'
    //   },
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

function NewChannelPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    // const channels = useSelector(state => state.channels.allChannels)
    // const posts = useSelector(state => state.posts.allPosts)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify({
                title: e.target.querySelector("#title").value,
                description: e.target.querySelector("#description").value,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch({type:'ADD_CHANNEL', channel: data})
            history.push('./channels')
        })
    }
    return (
        <div>
            <Header />
            <div className={classes.topRibbon}>
                Create a Channel
            </div>
            <Card className={classes.topRibbonDivider} variant="outlined"></Card>
            <Card className={classes.card} variant="outlined">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Title(max 300)' id="title" style={{width: 683}} className={classes.textInputs}/>
                    <textarea id="description" placeholder="Description(optional)" cols='100' rows='8' className={classes.textInputs}></textarea>
                    <button type="submit" className={classes.submitButton}>Create</button>
                </form>
            </Card>

        </div>
    )
}

export default NewChannelPage