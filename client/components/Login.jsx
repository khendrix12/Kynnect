import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const responseGoogle = (res) => {
    console.log(res);
  };

  const responseError = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId=""
        buttonText="Sign In"
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy="single_host_origin"
        responseType="code"
        accessType="offline"
        scope="openid email profile https://www.googleapis.com/auth/calendar.app.created"
      />
    </div>
  );
};

export default Login;
