const initialState = {
    allPosts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POSTS':{
            return {
                ...state,
                allPosts: action.posts
            }
        }
        default:
            return state;
  
    }
};
export default postReducer;