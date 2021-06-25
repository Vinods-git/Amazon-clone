import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userAction';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productAction';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    if (successSave) setModalVisible(false);
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setId(product._id);
    setName(product.name);
    setImage(product.image);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setModalVisible(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className='content content-margined'>
        <div className='product-header'>
          <h3>Products</h3>
          <button
            className='button primary'
            onClick={() => {
              openModal({});
            }}>
            Create Product{' '}
          </button>
        </div>
        <div className='product-list'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className='button'
                      onClick={() => openModal(product)}>
                      Edit
                    </button>{' '}
                    <button
                      className='button'
                      onClick={() => deleteHandler(product)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>
                  <b>{id ? 'Update' : 'Create'} Product</b>
                </h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  id='name'
                  onChange={(e) => setName(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Image</label>
                <input
                  type='text'
                  name='image'
                  value={image}
                  id='image'
                  onChange={(e) => setImage(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Price</label>
                <input
                  type='text'
                  name='price'
                  value={price}
                  id='price'
                  onChange={(e) => setPrice(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Brand</label>
                <input
                  type='text'
                  name='brand'
                  value={brand}
                  id='brand'
                  onChange={(e) => setBrand(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Category</label>
                <input
                  type='text'
                  name='category'
                  value={category}
                  id='category'
                  onChange={(e) => setCategory(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>CountInStock</label>
                <input
                  type='text'
                  name='countInStock'
                  value={countInStock}
                  id='countInStock'
                  onChange={(e) => setCountInStock(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={description}
                  id='description'
                  onChange={(e) => setDescription(e.target.value)}></input>
              </li>

              <li>
                <button className='button primary' type='submit'>
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  className='button secondary'
                  onClick={() => setModalVisible(false)}>
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;
