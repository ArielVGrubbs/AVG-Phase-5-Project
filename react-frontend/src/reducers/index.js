import { combineReducers } from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    //   all of the reducers names
    user: userReducer
});

export default rootReducer