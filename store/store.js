import {createStore} from 'redux';
import rootReducer from '../reducers'; // Assuming you have a rootReducer

const store = createStore(rootReducer);

export default store;
