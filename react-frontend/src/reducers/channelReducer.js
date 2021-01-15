const initialState = {
    allChannels: []
}

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CHANNELS':{
            return {
                ...state,
                allChannels: action.channels
            }
        }
        default:
            return state;
  
    }
};
export default channelReducer;