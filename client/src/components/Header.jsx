import React from 'react'

const Header = ({text}) => {
  return (
    <div className='bg-purple d-flex align-items-center h-25'>
        <h3 className='text-white fw-semibold mx-5'>{text}</h3>
    </div>
  )
}

export default Header