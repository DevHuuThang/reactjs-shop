import productsReducer from './productsReducer';
import headerReducer from './headerReducer';
import productDetailsReducer from './productDetailsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  productsReducer,
  headerReducer,
  productDetailsReducer,
});

export default rootReducer;
