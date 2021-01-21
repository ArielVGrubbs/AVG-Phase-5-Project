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
        case 'ADD_MODERATOR': {
            let newAllChannels = state.allChannels.filter(ch => ch.id !== action.channelOwner.channel_id)
            let moddedChannel = state.allChannels.find(ch => ch.id === action.channelOwner.channel_id)
            moddedChannel.channel_owners.push(action.channelOwner)
            return {
                ...state,
                allChannels: [...newAllChannels, moddedChannel]
            }
        }
        default:
            return state;
  
    }
};
export default channelReducer;