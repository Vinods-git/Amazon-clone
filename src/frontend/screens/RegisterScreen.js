import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';

function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/signin');
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>
              <b>Create a new account</b>
            </h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor='name'>Name</label>
            <input
              type='name'
              name='name'
              value={name}
              id='name'
              onChange={(e) => setName(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              id='email'
              onChange={(e) => setEmail(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              id='password'
              onChange={(e) => setPassword(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='rePassword'>Re-Password</label>
            <input
              type='rePassword'
              name='rePassword'
              value={rePassword}
              id='rePassword'
              onChange={(e) => setRePassword(e.target.value)}></input>
          </li>
          <li>
            <button className='button' type='submit'>
              Register
            </button>
          </li>
          <li>
            <span>
              Already have an account ? <Link to='/signin'>Sign in</Link>
            </span>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
