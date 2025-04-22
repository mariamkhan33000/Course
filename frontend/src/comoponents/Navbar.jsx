import React from 'react'
import logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav className='flex justify-between items-center container mx-auto'>
        <div className='flex items-center gap-2'>
            <img src={logo} className='w-10 h-10 rounded-full' alt="logo" />
            <h1 className='text-2xl text-orange-500 font-bold'>CourseHaven</h1>
        </div>
        <div className='flex gap-4'>
            <Link to={"/login"} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Login</Link>
            <Link to={"/signup"} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Signup</Link>
        </div>
    </nav>
    </>
  )
}

export default Navbar