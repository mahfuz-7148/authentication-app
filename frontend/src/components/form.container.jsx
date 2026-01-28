import React from 'react'

export const FormContainer = ({children}) => {
  return (
    <div className='container mx-auto px-4'>
      <div className='flex justify-center mt-12'>
        <div className='w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
