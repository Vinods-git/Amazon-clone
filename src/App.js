import React from 'react';
import './index.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
function openMenu() {
  document.querySelector('.sidebar').classList.add('open');
}
function closeMenu() {
  document.querySelector('.sidebar').classList.remove('open');
}
function App() {
  return (
    <Router>
      <div className='grid-container'>
        <header className='header'>
          <div className='logo'>
            <button onClick={openMenu}>&#9776;</button>
            <Link to='/'>Amazon</Link>
          </div>
          <div className='header-links'>
            <a href='cart.html'>Cart</a>
            <Link to='/signin'>Sign in</Link>
            <a href='signin'>Sign In</a>
          </div>
        </header>
        <aside className='sidebar'>
          <h3>
            <b>Shopping categories</b>
          </h3>
          <button className='close-menu-button' onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href='index.html'>Pants</a>
            </li>
            <li>
              <a href='index.html'>Shirts</a>
            </li>
          </ul>
        </aside>
        <main className='main'>
          <div className='content'>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/products/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
          </div>
        </main>
        <footer className='footer'>All right reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
