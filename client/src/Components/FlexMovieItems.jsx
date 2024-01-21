import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';


function FlexMovieItems({ movie }) {
  const navigate = useNavigate();
  return (
    <>
      <div className='flex items-center gap-2'>
        <span
          className='text-sm font-medium underline cursor-pointer hover:text-subMain'
          onClick={() => { navigate(`../movies/${movie.category}`) }}>{movie.category}</span>
      </div>
      <div className='flex items-center gap-2'>
        <FaRegCalendarAlt className='text-subMain w-3 h-3' />
        <span className='text-sm font-medium'>{movie.year}</span>
      </div>
      <div className='flex items-center gap-2'>
        <BiTime className='text-subMain w-3 h-3' />
        <span className='text-sm font-medium'>{movie.time} minutes</span>
      </div>
    </>
  )
}

export default FlexMovieItems