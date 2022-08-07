import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {

  apiKey: "AIzaSyDWCol1_ukNqbUuu9OXTCk2YhgOCiQfErA",

  authDomain: "frontend-academy-62049.firebaseapp.com",

  projectId: "frontend-academy-62049",

  storageBucket: "frontend-academy-62049.appspot.com",

  messagingSenderId: "650567051915",

  appId: "1:650567051915:web:5df3eebdcab8d56fae428e",

  measurementId: "G-TM4BC2TXKL"

};

initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
