import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase/app';


const AuthContext = React.createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkUpdate, setLinkUpdate] = useState(false);
  const value = {
    currentUser,
    links,
    signup,
    login,
    logout,
    addLink,
    deleteLink
  }

  // look for user on mount or change of auth state
  useEffect ( () => {
    const unsub = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  // update links on user sign in/out and on add/delete link
  useEffect ( () => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.uid);
      docRef.get().then(doc => {
        setLinks(doc.data().following);
      });
    }
  }, [currentUser, linkUpdate]);


  /* talk to the firebase */

  function signup (email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then(cred => {
      db.collection('users').doc(cred.user.uid).set({
        following: []
      });
    });
  }

  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout () {
    return auth.signOut()
    .then(() => {
      setLinks([]);
    });
  }

  function addLink (link) {
    return db.collection('users').doc(currentUser.uid).update({
      following: firebase.firestore.FieldValue.arrayUnion(link)
    }).then(() => {
      setLinkUpdate(!linkUpdate);
    });
  }

  function deleteLink (link) {
    return db.collection('users').doc(currentUser.uid).update({
      following: firebase.firestore.FieldValue.arrayRemove(link)
    }).then(() => {
      setLinkUpdate(!linkUpdate);
    });
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
