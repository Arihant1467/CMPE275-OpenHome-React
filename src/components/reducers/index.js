import { combineReducers } from "redux";
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
      hours : new Date().getHours(),
      min : new Date().getMinutes(),
      sec : new Date().getSeconds(),
    }
}


const rootReducer = combineReducers({
  user: UserProfileReducer,
  errors: LoginSignUpErrorReducer,
  searchFieldsHome: SearchFieldsReducer,
  searchResults : SearchResultsReducer,
  serverTime: TimeReducer
});

export default rootReducer;
