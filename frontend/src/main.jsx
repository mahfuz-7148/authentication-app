import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router';
import {App} from './App.jsx';
import {HomeScreen} from './components/home.screen.jsx';
import {Register} from './pages/register.jsx';
import {Provider} from 'react-redux';
import {store} from './utils/store.js';
import {ToastContainer} from 'react-toastify';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/register' element={<Register />} />
    </Route>
  )
)
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router}/>
  </Provider>
)