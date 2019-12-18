import {FETCH_SERVER_TIME} from '../actions/types.js'

export const TimeReducer = function(state = new Date(),action){
    
    switch(action.type){
        
        case FETCH_SERVER_TIME :
            console.log("fetching server time") 
            return Object.assign(state,action.payload);
        
        default         : return state;
                          
    }
}


