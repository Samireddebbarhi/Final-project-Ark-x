<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from "./app/store"
import {Provider} from "react-redux"

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <App />
    </Provider>
 
)
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
