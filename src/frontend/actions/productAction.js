import axios from 'axios';
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from '../constant/productConstants';

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    let data;

    if (!product._id) {
      data = await axios.post('/api/products', product, {
        headers: { Authorization: 'Bearer' + userInfo.token },
      });
    } else {
      data = await axios.put('/api/products/' + product._id, product, {
        headers: { Authorization: 'Bearer' + userInfo.token },
      });
    }
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: { data } });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};
const deleteProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    let data;
    data = await axios.delete('/api/products/' + product._id, product, {
      headers: { Authorization: 'Bearer' + userInfo.token },
    });

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProducts, detailProducts, saveProduct, deleteProduct };
// , {
//       headers: { Authorization: 'Bearer' + userInfo.token },
//     }
