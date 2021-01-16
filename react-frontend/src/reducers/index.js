import { combineReducers } from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import channelReducer from './channelReducer';

const rootReducer = combineReducers({
    //   all of the reducers names
    user: userReducer,
    posts: postReducer,
    channels: channelReducer,
});

export default rootReducer