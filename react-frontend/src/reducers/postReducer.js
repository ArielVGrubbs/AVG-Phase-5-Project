const initialState = {
    allPosts: [],
    newPost: {},
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POSTS':{
            return {
                ...state,
                allPosts: action.posts
            }
        }
        case 'ADD_POST': {
            return {
                ...state,
                allPosts: [...state.allPosts, action.post],
                newPost: action.post
            }
        }
        case 'UPDATE_POST': {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.post.id)
            return {
                ...state,
                allPosts: [...newAllPosts, action.post]
            }
        }
        case 'DELETE_POST': {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.post.id)
            if (action.post.postable_type === "Post"){
                let parentPost = newAllPosts.find(post => post.id === action.post.postable_id)
                parentPost.posts.filter(p => p.id !== action.post.id)
                newAllPosts.filter(post => post.id !== parentPost.id)
                newAllPosts = [...newAllPosts, parentPost]
            }
            return {
                ...state,
                allPosts: [...newAllPosts]
            }
        }
        case 'ADD_REPLY': {
            let parentPost = state.allPosts.find(post => post.id === action.reply.postable_id)
            let newAllPosts = state.allPosts.filter(post => post.id !== action.reply.postable_id)

            parentPost.posts = [...parentPost.posts, action.reply]
            return {
                ...state,
                allPosts: [...newAllPosts, parentPost, action.reply]
            }
        }
        case 'LIKE': {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.like.post_id)
            let likedPost = state.allPosts.find(post => post.id === action.like.post_id)
            likedPost.likes.push(action.like)
            return {
                ...state,
                allPosts: [...newAllPosts, likedPost]
            }
        }
        default:
            return state;
  
    }
};
export default postReducer;