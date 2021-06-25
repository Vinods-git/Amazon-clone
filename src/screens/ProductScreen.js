import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailProducts } from '../actions/productAction';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  //const { id } = useParams();
  // const product = data.products.find((x) => x.id == id);
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(detailProducts(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  return (
    <div>
      <div className='back-to-result'>
        <Link to='/'>Back to Home</Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='details'>
          <div className='details-image'>
            <img src={product.image} alt='product' />
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} reviews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>Description:</li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status:{' '}
                {product.countInStock > 0 ? (
                  <span>In Stock</span>
                ) : (
                  <span>Unavailable</span>
                )}
              </li>
              <li>
                Qty:
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 ? (
                  <button onClick={handleAddToCart} className='button'>
                    Add to Cart
                  </button>
                ) : (
                  <div>Out of Stock</div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
