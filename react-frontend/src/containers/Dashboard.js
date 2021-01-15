import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import PostList from './PostList'

function Dashboard() {
    return (
        <React.Fragment>
            <Header />
            <PostList />
        </React.Fragment>
    )
}

export default Dashboard