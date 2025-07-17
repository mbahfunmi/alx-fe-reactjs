// src/UserContext.js
import React from 'react';

// Initialize a Context using React.createContext() and export it.
// You can pass a default value to createContext, but it's often null
// if the actual value will be provided by a Provider.
const UserContext = React.createContext(null);

export default UserContext;