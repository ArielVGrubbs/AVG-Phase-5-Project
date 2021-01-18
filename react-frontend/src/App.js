import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

// import PostList from './containers/PostList';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './containers/Dashboard';
import NewPostPage from './components/NewPostPage'
import UserPage from './components/UserPage'
import PostPage from './components/PostPage';
// import Header from './components/Header'


function App() {

  const dispatch = useDispatch()

    useEffect(()=> {
      let users
      let channels

      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        users = data
        // dispatch({type: 'GET_USERS', users: data})
        // dispatch({type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
        fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Auth-key': localStorage.getItem('auth_key')
        }
        })
        .then(res => res.json())
        .then(data => {
          channels = data
          // dispatch({type: 'GET_CHANNELS', channels: data})
          fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // 'Auth-key': localStorage.getItem('auth_key')
            }
          })
          .then(res => res.json())
          .then(data => {
            dispatch({type: 'GET_POSTS', posts: data})
            dispatch({type: 'GET_CHANNELS', channels: channels})
            dispatch({type: 'GET_USERS', users: users})
            dispatch({type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
            console.log("All fetches done")
          })
        })
      })
      // fetch('http://localhost:3000/channels', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Auth-key': localStorage.getItem('auth_key')
      //   }
      // })
      // .then(res => res.json())
      // .then(data => {
      //   dispatch({type: 'GET_CHANNELS', channels: data})
      // })
      // fetch('http://localhost:3000/posts', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Auth-key': localStorage.getItem('auth_key')
      //   }
      // })
      // .then(res => res.json())
      // .then(data => {
      //   dispatch({type: 'GET_POSTS', posts: data})
      // })
    }, [])

  const users = useSelector(state => state.user.allUsers)
  const posts = useSelector(state => state.posts.allPosts)

  return (
    <div className="App" >
      <Router>
        {/* <Header /> */}
        <Switch>

          <Route path="/dashboard" component={() => {
            if (localStorage.getItem('auth_key') !== 'undefined'){
              return <Dashboard />
            } else {
              return <Redirect to='/login' />
            }

          }}/>

          <Route path="/login" component={() => {
            return <Login />
          }}/>
          
          <Route path="/sign_up" component={() => {
            return <SignUp />
          }}/>

          <Route path="/new_post" component={() => {
            return <NewPostPage />
          }}/>

          <Route path="/user/:username" component={() => {
            return <UserPage />
          }}/>

          <Route path="/posts/:post_id" component={() => {
            return <PostPage />
          }}/>

          <Route path="/logout" component={() => {
            localStorage.setItem('auth_key','undefined')
            localStorage.setItem('currentUserUsername', 'undefined')
            return <Redirect to='/login' />
          }}/>

          <Route component={() => {
            return <Redirect to='/login' />
          }}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App