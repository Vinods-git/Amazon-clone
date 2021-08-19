import Cookies from "js-cookie";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productDeleteReducer,
  productSaveReducer
} from "./frontend/reducers/productReducers";
import {
  userRegisterReducer,
  userSigninReducer
} from "./frontend/reducers/userReducer";
import { cartReducer } from "./frontend/reducers/cartReducer";
import {
  productDetailsReducer,
  productListReducer
} from "./frontend/reducers/productReducers";

const cartItems = [];
const userInfo = null;

const initialState = { cart: { cartItems }, userSignin: { userInfo } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  userSignin: userSigninReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeForAmazon = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default storeForAmazon;
