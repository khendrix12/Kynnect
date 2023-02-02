import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';


const ImplicitLogin = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
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
