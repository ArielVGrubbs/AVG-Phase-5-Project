export const login = (user) => {
    return {
        type: 'LOGIN',
        user: user
    }
  }
  
  export const logout = (user) => {
    return {
        type: 'LOGOUT',
        user: user
    }
  }
  export const signupNewUser = (user) => {
    return {
        type: 'SIGNUP',
        user: user
    }
  }
  
  export const getUsers = (users) => {
    return {
        type: 'GET_USERS',
        users: users
    }
  }