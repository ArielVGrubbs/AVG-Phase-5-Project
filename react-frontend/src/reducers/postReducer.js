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
        default:
            return state;
  
    }
};
export default postReducer;