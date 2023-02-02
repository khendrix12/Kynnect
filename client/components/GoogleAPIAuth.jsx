import React, { useEffect } from 'react';
import gapi from 'gapi-client';

const GoogleAPIAuth = () => {
  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: '',
        clientId: '',
        scope: '',
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
        const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        console.log(accessToken);
      });
    });
  }, []);

  return (<div>Authenticating...</div>);
};

export default GoogleAPIAuth;
