import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import PostList from './PostList'

function Dashboard() {
    const [searchContent, setSearchContent] = useState('')

    let posts = useSelector(state => state.posts.allPosts)
    let posts2
    if (posts[0]){
        // debugger
        let posts1 = posts.filter(p => p.title)
        posts2 = posts1.filter(p => p.title.toLowerCase().includes(searchContent.toLowerCase()) || p.content.includes(searchContent.toLowerCase()))
        // debugger
    } 
    posts.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : 1)
    
    return (
        <React.Fragment>
            <Header setSearchContent={setSearchContent}/>
            <PostList posts={posts2}/>
        </React.Fragment>
    )
}

export default Dashboard