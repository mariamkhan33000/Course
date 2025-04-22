import React from 'react'
import Navbar from './Navbar'
import logo from '../assets/logo.webp'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='bg-gradient-to-r from-black to-blue-950 text-white p-6'>
        <div className='h-screen'>
            {/* Header */}
            <header>
                <Navbar/>
            </header>
            {/* Main Content */}
            <section>
              <div className='flex flex-col justify-center items-center py-3'>
                <h1 className='text-4xl text-orange-500 font-bold'>CourseHaven</h1>
                <p className='text-slate-400 mt-3'>Shapen your skills courses crafted by expert</p>
                <div className='flex gap-4 mt-5'>
                  <button className='bg-green-400 px-3 py-2 rounded-md hover:bg-green-700 text-xl'>Explore Courses</button>
                  <button className='bg-white px-3 py-2 rounded-md hover:bg-green-700 text-xl text-black font-bold'>Course Videos</button>
                </div>
              </div>
            </section>
            <section>Section 2</section>
            {/* Footer */}
            <hr/>
            <footer className='my-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 p-6'>
              <div>
                <div className='flex items-center space-x-4'>
                  <img src={logo} className='w-10 h-10 rounded-full' alt="" />
                  <h1 className='text-orange-500  font-semibold'>CourseHaven</h1>
                </div>
                <div>
                  <p className='mt-2'>follow us</p>
                  <div className='flex gap-4 mt-2'>
                  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={22} className='hover:bg-orange-500 rounded-full'/>
                  </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={22} className='hover:bg-orange-500 rounded-full'/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={22} className='hover:bg-orange-500 rounded-full' />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h1>Connects</h1>
                <Link to={"/about"} className='block mt-2 text-slate-400'>youtube- learn coding</Link>
                <Link to={"/about"} className='block mt-2 text-slate-400'>telegram- learn coding</Link>
                <Link to={"/about"} className='block mt-2 text-slate-400'>Github- learn coding</Link>
              </div>
              <div>
                <h1>Copyrights © 2025</h1>
                <p className='text-slate-400'>Terms @ Conditions</p>
                <p className='text-slate-400'>Privacy Policy</p>
                <p className='text-slate-400'>Refund & Concellation</p>
              </div>
              </div>
            </footer>
        </div>
    </div>
  )
}

export default Home