import {createStore,applyMiddleware,compose} from 'redux';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import thunk from 'redux-thunk';
import rootReducer from './../reducers/index.js';
import {appState} from './../reducers/index.js';


//const middleware = [thunk]


const config = {}
const middleware = [
  createStateSyncMiddleware(config),
  thunk,
]

// const store = createStore(
//     rootReducer,
//     appState,
//     compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );


const store = createStore(
    rootReducer,
    appState,
    compose(
        applyMiddleware(...middleware)
    )
);

initStateWithPrevTab(store);

export default store;