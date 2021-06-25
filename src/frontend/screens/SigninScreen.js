import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userAction';

function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>
              <b>Sign In</b>
            </h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
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
            <button className='button' type='submit'>
              Sign in
            </button>
          </li>
          <li>New to amazon ?</li>
          <li>
            <Link to='/register' className='button secondary full width'>
              Create your amzaon account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
