import React from 'react'
import Aside from '../QueueInterest/Aside'
import '../QueueInterest/css/index.css'
import MainQuestion from './MainQuestion'

  
const index = () => {
  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Aside/>
            <MainQuestion/>
        </div>
    </div>
  )
}

export default index