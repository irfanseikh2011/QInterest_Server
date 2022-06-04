import React from 'react'
import {Public} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './css/Aside.css'

function Aside() {
  return (
    <div className='sidebar'> 
        <div className='sidebar-container'>
            <div className='sidebar-options'>
                <div className='sidebar-option'>
                    <Link>Home</Link>
                </div>
                <div className='sidebar-option'>
                    <Link>Public</Link>
                    <div className='link'> 
                        <div className='link-tag'>
                            <Public/>
                            <Link to='/'>Questions</Link>
                        </div>
                        <div className='tags'>
                            <p>Tags</p>
                            <p>Users</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Aside