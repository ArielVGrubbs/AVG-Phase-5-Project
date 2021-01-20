const initialState = {
    allChannels: [],
    newChannel: {}
}

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CHANNELS':{
            return {
                ...state,
                allChannels: action.channels
            }
        }
        case 'ADD_CHANNEL': {
            return {
                ...state,
                allChannels: [...state.allChannels, action.channel],
                newChannel: action.channel
            }
        }
        default:
            return state;
  
    }
};
export default channelReducer;