import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { data } from './data';
import { listProducts } from '../actions/productAction';

function HomeScreen() {
  //const [products, setProducts] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <ul className='products'>
        {products.map((product) => (
          <li key={product.id}>
            <div className='product'>
              <img
                className='product-image'
                src={product.image}
                alt='product 1'
              />
              <div className='product-name'>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </div>
              <div className='product-brand'>{product.brand}</div>
              <div className='product-price'>${product.price}</div>
              <div className='product-rating'>
                {product.rating} stars({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;
