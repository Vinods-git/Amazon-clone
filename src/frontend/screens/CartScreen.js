import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
function CartScreen(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const chechoutHandler = () => {
    props.history.push('/signin/redirect=shipping');
  };

  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {
      //
    };
  }, []);

  return (
    <div className='cart'>
      <div className='cart-list'>
        <ul className='cart-list-container'>
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className='cart-image'>
                  <img
                    src={'/images/' + item.image + '.jpg'}
                    alt='product'></img>
                </div>
                <div className='cart-name'>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>{' '}
                    <button
                      type='button'
                      className='button primary'
                      onClick={() => removeFromCartHandler(item.product)}>
                      {' '}
                      Delete{' '}
                    </button>
                  </div>
                </div>
                <div className='cart-price'>${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className='cart-action'>
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) :
          ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
        </h3>
        <button
          className='button primary full-width'
          disabled={cartItems.length === 0}
          onClick={chechoutHandler}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
