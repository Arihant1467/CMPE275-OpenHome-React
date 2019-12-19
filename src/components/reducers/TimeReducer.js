import {FETCH_SERVER_TIME} from '../actions/types.js'

export const TimeReducer = function(state = {},action){
    
    switch(action.type){
        case FETCH_SERVER_TIME :
            const newState = Object.assign(state,action.payload);
            console.log("printing new State");
            console.log(JSON.stringify(newState))
            return newState;
        default         : return state;
                          
    }
}


