import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password);
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(auth.getAuth(), (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
