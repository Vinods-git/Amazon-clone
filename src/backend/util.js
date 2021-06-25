import { configure } from '@testing-library/react';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
//import config from './config';

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    'SOMETHINGSECRET',
    { expiresIn: '48h' }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: 'Invalid Token' });
      }
      req.user = token;
      next();
      return;
    });
  }
  return res.status(401).send({ msg: 'Token is not suppled' });
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin Token is not suppled' });
};

export { getToken };
