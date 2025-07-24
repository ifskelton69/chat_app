import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../store/useAuth';
import { LogOut, MessagesSquare, Settings, User } from "lucide-react";


const Navbar = () => {
  const { logout, authUser } = useAuth();
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>

      <div className='cotainer mx-auto px-4 h-16 '>
        <div className='flex items-center justify-between h-full'>
          <div>
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 translate-all">
              <div className='size-9 rounded-lg bg-primay/10 flex items-center justify-center'>
                <MessagesSquare className='w-5 h-5 text-green-500' />
              </div>
              <h1 className='text-lg font-bold'>QuickChat</h1>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <Link to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="h-4 w-4 ">
                <span className='hidden sm-inline'>Settings</span>
              </Settings>
            </Link>
            {authUser && (<>
              <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5"/>
                <span className='hidden sm-inline'>Profile</span>
              </Link>
            

            
            <button className='flex gap-2 items-center' onClick={logout}>
              <LogOut className="size-5" />
              <span className='hidden sm-inline'>Logout</span>
            </button>
            </>)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
