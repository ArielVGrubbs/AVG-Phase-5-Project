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
        default:
            return state;
  
    }
};
export default postReducer;