import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const serchparam = new URLSearchParams(document.location.search);
// if(serchparam.get("code")!==null){
//   const store = JSON.parse(serchparam.get("code"));
//   Object.keys(store).forEach(a=>{
//     window.localStorage.setItem(a,store[a]);
//   })
//   document.location.search = "";
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
