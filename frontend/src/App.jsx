import React from 'react'
import {Header} from './components/header.jsx';
import {Outlet} from 'react-router';

export const App = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto px-4 my-8'>
        <Outlet />
      </div>
    </>
  )
}
