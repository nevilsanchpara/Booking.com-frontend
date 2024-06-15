// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { MdHotel, MdRoom, MdSettings, MdPerson } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='bg-blue-800 text-white p-4 min-h-full'>
      <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
      <ul className='space-y-2 flex-1'>
        <li className='hidden md:flex items-center'>
          {/* Display text and icons for medium and larger screens */}
          <Link to='/add-hotel' className='flex items-center'>
            <MdHotel className='inline mr-2' />
            Add Hotel
          </Link>
        </li>
        <li className='hidden md:flex items-center'>
          <Link to='/add-room' className='flex items-center'>
            <MdRoom className='inline mr-2' />
            Add Room
          </Link>
        </li>
        <li className='hidden md:flex items-center'>
          <Link to='/settings' className='flex items-center'>
            <MdSettings className='inline mr-2' />
            Settings
          </Link>
        </li>
        <li className='hidden md:flex items-center'>
          <Link to='/profile' className='flex items-center'>
            <MdPerson className='inline mr-2' />
            Profile
          </Link>
        </li>
        {/* Add more links to other pages here */}
        {/* For small screens, display only icons */}
        <li className='md:hidden flex items-center'>
          <Link to='/add-hotel' className='flex items-center'>
            <MdHotel className='inline' />
          </Link>
        </li>
        <li className='md:hidden flex items-center'>
          <Link to='/add-room' className='flex items-center'>
            <MdRoom className='inline' />
          </Link>
        </li>
        <li className='md:hidden flex items-center'>
          <Link to='/settings' className='flex items-center'>
            <MdSettings className='inline' />
          </Link>
        </li>
        <li className='md:hidden flex items-center'>
          <Link to='/profile' className='flex items-center'>
            <MdPerson className='inline' />
          </Link>
        </li>
        {/* Add more icon links for small screens */}
      </ul>
    </div>
  );
};

export default Sidebar;
