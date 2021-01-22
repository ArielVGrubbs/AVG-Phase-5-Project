import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { login } from '../actions/userActions';

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.info.dark,
      },
      links: {
        color: '#2196f3'
      }
    }));


function SignUp() {
  const classes = useStyles();

  let history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      user: {
        email: e.target.querySelector('#email').value,
        username: e.target.querySelector('#username').value,
        password: e.target.querySelector('#password').value
      }
    }
    fetch('http://localhost:3000/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(userObj => {
      console.log(userObj)
      localStorage.setItem('auth_key',userObj['auth_key'])
      localStorage.setItem('currentUserUsername', newUser.user.username)
      dispatch({type: 'SIGN_UP', user: newUser.user})
      history.push('/dashboard')
    })
  }

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ChildCareIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                  </Grid>
                  <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="username"
                          label="Username"
                          type="username"
                          id="username"
                          autoComplete="current-username"
                        />
                  </Grid>
                  <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                  </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                  Sign Up
                </Button>

                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="http://localhost:3001/login" variant="body2" classname={classes.links}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
            </form>
        </div>
    </Container>
  );
}
export default SignUp