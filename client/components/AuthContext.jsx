import React, {
  createContext, useContext, useState,
} from 'react';

const AuthContext = createContext({
//   isAuthenticated: false,
  isAuthenticated: { status: false, email: '' },
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({ status: false, email: '' });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export {
  AuthContext, AuthProvider, useAuth,
};
