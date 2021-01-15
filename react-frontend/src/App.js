import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

// import PostList from './containers/PostList';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './containers/Dashboard';
import NewPostPage from './components/NewPostPage'
// import Header from './components/Header'


function App() {

  const dispatch = useDispatch()

    useEffect(()=> {
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'GET_USERS', users: data})
      })
      // fetch('http://localhost:3000/channels')
      // .then(res => res.json())
      // .then(data => {
      //   // dispatch({type: 'GET_CHANNELS', channels: data})
      // })
      fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'GET_POSTS', posts: data})
      })
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

          <Route path="/sign_up" component={() => {
            return <NewPostPage />
          }}/>

          <Route path="/logout" component={() => {
            localStorage.setItem('auth_key','undefined')
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