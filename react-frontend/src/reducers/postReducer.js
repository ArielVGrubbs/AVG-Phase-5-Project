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
            return {
                ...state,
                allPosts: [...state.allPosts, action.post]
            }
        }
        case 'DELETE_POST': {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.post.id)
            return {
                ...state,
                allPosts: [newAllPosts]
            }
        }
        default:
            return state;
  
    }
};
export default postReducer;