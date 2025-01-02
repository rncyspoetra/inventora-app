import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Layout = ({children , text}) => {
  return (
    <React.Fragment>
        <div className='d-flex bg-secondary-subtle'>
          <Sidebar />
          <div className='flex-grow-1'>
            <Header text={text}/>
            <main>{children}</main>
          </div>
        </div>
    </React.Fragment>
  )
}

export default Layout