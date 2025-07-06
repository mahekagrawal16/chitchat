import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

  const {selectedUser,messages} = useContext(ChatContext)
  const {logout,onlineUsers}= useContext(AuthContext)
  const [msgImages,setMsgImages]=useState([])


  //get all the images from the messages and set them to state
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[messages])

  return selectedUser && (
    <div
  className={`bg-[#fceae8]/20 text-[#4e342e] w-full relative overflow-y-scroll 
    ${selectedUser ? 'max-md:hidden' : ''}`}
>
  <div
    className='pt-20 flex flex-col items-center gap-3 font-[Segoe UI] mx-auto'
  >
    <img
      src={selectedUser?.profilePic || assets.avatar_icon}
      alt=''
      className='w-28 h-28 object-cover rounded-full border border-[#d7ccc8] shadow-md'
    />
    <h1
      className='px-10 text-xl font-semibold mx-auto flex items-center gap-2 text-[#3e2723]'
    >
      {onlineUsers.includes(selectedUser._id) && (
        <p className='w-2 h-2 rounded-full bg-green-500'></p>
      )}
      {selectedUser.fullName}
    </h1>
    <p className='px-10 mx-auto text-sm text-[#6d4c41]'>{selectedUser.bio}</p>
  </div>

  <hr className='border-gray-500 my-5' />

  <div className='px-6 font-[Segoe UI] text-sm'>
    <p className='text-base font-medium text-[#5d4037]'>Media</p>
    <div
      className='mt-3 max-h-[500px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-90'
    >
      {msgImages.map((url, index) => (
        <div
          key={index}
          onClick={() => window.open(url)}
          className='cursor-pointer rounded shadow-sm hover:scale-105 transition-transform'
        >
          <img src={url} alt='' className='h-30 w-30 rounded-md object-cover' />
        </div>
      ))}
    </div>
  </div>

  <button
    onClick={() => logout()}
    className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#c8a78d] to-[#a1887f] text-white border-none text-base font-medium py-2 px-20 rounded-full cursor-pointer shadow-lg hover:opacity-90 transition'
  >
    Logout
  </button>
</div>
  )
}

export default RightSidebar
