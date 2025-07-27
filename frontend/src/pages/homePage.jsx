import React from 'react'
import {useChat} from '../store/useChat.js'
import Sidebar from '../components/sideBar.jsx'
import NoChatContainer from '../components/noChatContainer.jsx' 
import ChatContainer from '../components/chatContainer.jsx'

const homePage = () => {
  const {selectedUser} = useChat();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>
            {!selectedUser ? <NoChatContainer/> : <ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage
