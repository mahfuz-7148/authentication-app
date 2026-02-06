import {createRoot} from "react-dom/client";
import "./index.css";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router';
import {App} from './App.jsx';
import {Home} from './pages/home.jsx';
import {Register} from './pages/register.jsx';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './utils/store.js';
import {Login} from './pages/login.jsx';
import UpdateProfile from './pages/update.profile.jsx';

 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/update-profile' element={<UpdateProfile />} />
    </Route>
  )
)
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router}/>
  </Provider>
)