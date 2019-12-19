import { combineReducers } from "redux";
import { withReduxStateSync } from 'redux-state-sync'
import {UserProfileReducer,LoginSignUpErrorReducer} from './ProfileReducer.js';
import {SearchFieldsReducer} from './SearchFieldsReducer.js';
import {SearchResultsReducer} from './SearchResultsReducer.js';
import {TimeReducer} from './TimeReducer';


export const appState = {
    user : {},
    errors:[],
    searchFieldsHome:{},
    searchResults:[],
    serverTime: {
      monthValue : new Date().getMonth() + 1,
      dayOfMonth: new Date().getDate(),
      year : new Date().getFullYear(),
      hour : new Date().getHours(),
      minute : new Date().getMinutes(),
      second : new Date().getSeconds(),
    }
}


const rootReducer = combineReducers({
  user: UserProfileReducer,
  errors: LoginSignUpErrorReducer,
  searchFieldsHome: SearchFieldsReducer,
  searchResults : SearchResultsReducer,
  serverTime: TimeReducer
});

//export default rootReducer;
export default withReduxStateSync(rootReducer);
