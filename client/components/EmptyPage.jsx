import React from 'react';
import { Link } from 'react-router-dom';
import ImplicitLogin from './ImplicitLogin.jsx';

const EmptyPage = () => (
  <div className="login">
    <h1>Kynnect</h1>
    <div className="links">
      <Link className="link" to="/landing">Dashboard</Link>
    </div>
    <div className='logindiv'>
      <ImplicitLogin />
    </div>


  </div>
);

export default EmptyPage;
