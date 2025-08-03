import React, { useEffect } from 'react'
import { useChat } from '../store/useChat.js'
import { Users } from 'lucide-react'
import sideBarSkeleton from '../components/skeleton/sideBarskeleton.jsx'
import { useAuth } from '../store/useAuth.js'

const SideBar = () => {
    const { selectedUser, getUsers, users, isUserLoading, setSelectedUser, onlineUser } = useChat();
    const { onlineUsers } = useAuth();
    
    useEffect(() => {
        getUsers();
    }, [getUsers])
    
    if (isUserLoading) {
        return <sideBarSkeleton />
    }
    
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100'>
            {/* Header */}
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
                
            </div>

            {/* Users List */}
            <div className='overflow-y-auto w-full py-3 flex-1'>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors
                                ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
                                lg:justify-start justify-center`}
                        >
                            {/* Avatar */}
                            <div className='relative flex-shrink-0'>
                                <img 
                                    src={user.profilepic || "/avatar.png"} 
                                    alt={user.name} 
                                    className='size-12 object-cover rounded-full' 
                                />
                                {(onlineUser?.includes(user._id) || onlineUsers?.includes(user._id)) && (
                                    <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
                                )}
                            </div>

                            {/* User Info - Hidden on mobile, shown on large screens */}
                            <div className='hidden lg:block text-left min-w-0 flex-1'>
                                <div className='font-medium truncate'>{user.fullname}</div>
                                <div className='text-sm text-zinc-400'>
                                    {(onlineUser?.includes(user._id) || onlineUsers?.includes(user._id)) ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className='text-center text-zinc-400 py-4 px-2'>
                        <div className='hidden lg:block'>No users found</div>
                        <Users className='size-8 mx-auto lg:hidden opacity-50' />
                    </div>
                )}
            </div>
        </aside>
    )
}

export default SideBar