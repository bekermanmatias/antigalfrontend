import React from 'react'

const LupaWidget = ({ onClick }) => {
  return (
    <div onClick={onClick} >
        <img className='lupa' src='/images/lupa.svg' width={40} alt='icono de lupa de antigal' />
    </div>
  )
}

export default LupaWidget