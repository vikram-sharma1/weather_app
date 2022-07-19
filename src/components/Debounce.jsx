import React from 'react'
import '../styles/Debounce.css'
import logo from '../images/location.png'

const Debounce = () => {

  





  return (
    <>
      <div className='mainBox'>
          <div className='logoinp'>
            <img src={logo} alt=""  className='logo'/>
            <input type="text" className='inpSearchBox' />
          </div>
          <div className='outputBox'>

          </div>
      </div>
    </>
  )
}

export default Debounce