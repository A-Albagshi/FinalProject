import React, { createContext, useEffect, useState } from 'react';
import firebase from '../../config/firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
	}, []);
	return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
};
