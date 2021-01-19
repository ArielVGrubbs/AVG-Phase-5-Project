const initialState = {
    isLoggedIn: false,
    allUsers: [],
    currentUser: {
        password: '',
        username: '',
        email: ''
    },
    userFetch: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':{
            return {
                ...state,
                allUsers: action.users,
                userFetch: true
            }
        }
        case 'LOGOUT':{
            return {
                ...state,
                isLoggedIn: false,
                currentUser: action.user
            }
        }
        case 'LOGIN':{
            let cU = state.allUsers.find(user => user.username === action.username)
            return {
                ...state,
                isLoggedIn: true,
                currentUser: cU
            }
        }
        // case 'SIGN_UP':{
        //     return {
        //         ...state,
        //         isLoggedIn: true,
        //         currentUser: action.user
        //         // allUsers: [...state.allUsers, action.user]
        //     }
        // }
        // case 'UPDATE_CURRENT_USER':{
        //     return {
        //         ...state,
        //         isLoggedIn: true,
        //         currentUser: action.user
        //     }
        // }
        default:
            return state;
  
    }
};
export default userReducer;