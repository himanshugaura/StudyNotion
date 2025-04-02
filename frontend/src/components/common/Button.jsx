import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children ,active , linkto}) => {
  return (
   <Link to={linkto}>
    <div className={`flex items-center justify-center gap-2 text-center text-[13px] px-6 py-3 shadow-[2px_2px_0px] shadow-white/18 rounded-[8px] 
         ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-richblack-5"} hover:scale-95 transition-all duration-200`}>
        {children}
    </div>
   </Link>
  )
}

export default Button