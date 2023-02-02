import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainContainer from './containers/MainContainer.jsx';

const App = () => (
  <GoogleOAuthProvider clientId="">
    <div id="app">
      <h1>Insert name here</h1>
      <h3>Beep boop beep.</h3>
      <MainContainer />
    </div>
  </GoogleOAuthProvider>


);
export default App;
