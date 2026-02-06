import React from 'react'
import {Outlet} from 'react-router';
import {Header} from './components/header.jsx';

export const App = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet/>
      </div>
    </>
  )
}
