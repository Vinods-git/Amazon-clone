import {ContactReducer} from '../reducer/ContactReducer';
import {combineReducers} from 'redux';

export default combineReducers({
	contact : ContactReducer,
})