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

  function logIn(email, password) {
    return auth.signInWithEmailAndPassword(auth.getAuth(), email, password);
  }

  function logout() {
    return auth.signOut(auth.getAuth());
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(auth.getAuth(), email);
  }

  function updateEmail(email) {
    return auth.updateEmail(auth.getAuth().currentUser, email);
  }

  function updatePassword(password) {
    return auth.updatePassword(auth.getAuth().currentUser, password);
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
    logIn,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
