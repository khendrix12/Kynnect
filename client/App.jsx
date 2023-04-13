import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MainContainer from './containers/MainContainer.jsx';
import EmptyPage from './components/EmptyPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

const App = () => {
  const history = createBrowserHistory();
  console.log({ env: process.env.GOOGLE_CLIENT_ID });
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router history={history}>
          <Routes>
            <Route path="/" element={<EmptyPage />} />
            <Route exact path="/landing" element={<PrivateRoute />}>
              <Route exact path="/landing" element={<MainContainer />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>


  );
};
export default App;
