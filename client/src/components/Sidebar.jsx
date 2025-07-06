import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext)

  const { logout, onlineUsers } = useContext(AuthContext)

  const [input, setInput] = useState(false)
  const navigate = useNavigate()

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers])

  return (
    <div
      className={`bg-orange-900/20 h-full p-5 rounded-r-xl overflow-y-scroll text-[#4e342e] backdrop-blur-xl ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Header with logo and menu */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <img src={assets.icon} alt='logo' className='w-8 h-8 object-contain' />
            <span className='text-xl font-semibold text-orange-1000'>ChitChat</span>
          </div>
          <div className='relative py-2 group'>
            <img
              src={assets.menu_icon}
              alt='Menu'
              className='max-h-5 cursor-pointer'
            />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-orange-950/80 backdrop-blur-md border border-[#a1887f] text-white shadow-xl hidden group-hover:block'>
              <p
                onClick={() => navigate('/profile')}
                className='cursor-pointer text-sm hover:text-amber-500'
              >
                Edit Profile
              </p>
              <hr className='my-2 border-t border-[#a1887f]/50' />
              <p
                onClick={() => logout()}
                className='cursor-pointer text-sm hover:text-amber-500'
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-black/10 backdrop-blur-md rounded-full flex items-center gap-2 py-3 px-4 mt-5 border border-[#d7ccc8]'>
          <img src={assets.search_icon} alt='Search' className='w-3' />
          <input
            onChange={(e) => setInput(e.target.value)}
            type='text'
            className='bg-transparent border-none outline-none text-sm text-orange-950 placeholder-orange-950 flex-1'
            placeholder='Search User...'
          />
        </div>
      </div>

      {/* User List */}
      <div className='flex flex-col'>
        {filteredUsers.map((user, index) => (
          <React.Fragment key={index}>
          <div
            onClick={() => {
              setSelectedUser(user)
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }))
            }}
            key={index}
            className={`relative flex items-center gap-2 p-2 px-4 rounded cursor-pointer hover:bg-[#c8a78d]/40 hover:shadow-inner hover:backdrop-blur-sm
                 transition max-sm:text-sm ${
              selectedUser?._id === user._id && 'bg-[#d7ccc8]/40'
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=''
              className='w-[55px] aspect-square rounded-full'
            />
            <div className='flex flex-col leading-5 text-[#4e342e]'>
              <p className='font-semibold'>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className='text-green-600 text-xs'>Online</span>
              ) : (
                <span className='text-gray-500 text-xs'>Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-[#a1887f]/60 text-white'>
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
          <hr className='border-pink-100 mx-3' />
  </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
