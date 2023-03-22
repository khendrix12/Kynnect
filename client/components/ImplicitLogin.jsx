import { useGoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';


const ImplicitLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`)
        .then(response => response.json())
        .then(data => {
          setIsAuthenticated({ status: true, email: data.email });
          console.log(data);
        });
    },
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.app.created',
  });
  return (
    <button onClick={() => login()}>
      {' '}
      Sign in with Google 🚀
      {' '}

    </button>
  );
};

export default ImplicitLogin;
