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

// Completely useless, when I want to make a new dispatch I'll just do it in place. 
// There's no need to come to this file and then write a whole function then export it
// and import it where I want to use the dispatch. It's just inefficient.