import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  
    const {messages,selectedUser,setSelectedUser,sendMessage,
        getMessages}=useContext(ChatContext)

    const {authUser,onlineUsers}=useContext(AuthContext)
    const scrollEnd =useRef()

    const [input,setInput] =useState(''); 

    const handleSendMessage=async(e)=>{
        e.preventDefault();
        if(input.trim()=== "") return null;
        await sendMessage({text:input.trim()});
        setInput("")
    }

    //handle sending an image
    const handleSendImage=async(e)=>{
        const file=e.target.files[0];
        if(!file  || !file.type.startsWith("image/")){
            toast.error("select an image file")
            return;
        }
        const reader =new FileReader();

        reader.onloadend=async()=>{
            await sendMessage({image:reader.result})
            e.target.value=""
        }
        reader.readAsDataURL(file)
    }
    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    },[selectedUser])
    useEffect(()=>{
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({behavior : "smooth"})
        }
    },[messages])

    return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>

  {/*----- Header -------*/}
  <div className='flex items-center gap-3 py-2 mx-4 border-b border-[#c8a78d]'>
    <img
      src={selectedUser.profilePic || assets.avatar_icon}
      alt=""
      className='w-10 h-10 object-cover rounded-full border border-[#d7ccc8]'
    />
    <p className='flex-1 text-lg text-[#4e342e] font-semibold flex items-center gap-2'>
      {selectedUser.fullName}
      {onlineUsers.includes(selectedUser._id) && (
        <span className='w-2 h-2 rounded-full bg-green-500'></span>
      )}
    </p>
    <img
      onClick={() => setSelectedUser(null)}
      src={assets.arrow_icon}
      alt=''
      className='md:hidden w-6 cursor-pointer'
    />
    <img
      src={assets.help_icon}
      alt=''
      className='max-md:hidden w-5 opacity-80'
    />
  </div>

  {/*----- Chat Area -------*/}
  <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-4 pb-6'>
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`flex items-end gap-3 justify-end ${
          msg.senderId !== authUser._id && 'flex-row-reverse'
        }`}
      >
        {msg.image ? (
          <img
            src={msg.image}
            alt=""
            className='max-w-[230px] border border-[#c8a78d] rounded-lg overflow-hidden mb-8'
          />
        ) : (
          <p
            className={`p-3 max-w-[200px] text-sm font-light rounded-lg mb-8 break-words text-white ${
              msg.senderId === authUser._id
                ? 'bg-orange-800/100 rounded-br-none'
                : 'bg-[#a1887f]/100 rounded-bl-none'

            }`}
          >
            {msg.text}
          </p>
        )}
        <div className='text-center text-xs'>
          <img
            src={
              msg.senderId === authUser._id
                ? authUser?.profilePic || assets.avatar_icon
                : selectedUser?.profilePic || assets.avatar_icon
            }
            alt=''
            className='w-7 h-7 object-cover rounded-full border border-[#d7ccc8]'
          />
          <p className='text-[#8d6e63] mt-1'>{formatMessageTime(msg.createdAt)}</p>
        </div>
      </div>
    ))}
    <div ref={scrollEnd}></div>
  </div>

  {/*------ Bottom Area -------*/}
  <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border-t border-[#d7ccc8]'>
    <div className='flex-1 flex items-center bg-black/20 px-4 py-2 rounded-full border border-[#e8cfc5]'>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
        type='text'
        placeholder='Send a message'
        className='flex-1 text-sm p-2 border-none bg-transparent rounded-lg outline-none text-[#4e342e] placeholder-[#a1887f]'
      />
      <input onChange={handleSendImage} type='file' id='image' accept='image/png, image/jpeg' hidden />
      <label htmlFor='image'>
        <img
          src={assets.gallery_icon}
          alt=''
          className='w-5 mr-2 cursor-pointer opacity-80 hover:opacity-100 transition'
        />
      </label>
    </div>
    <img
      onClick={handleSendMessage}
      src={assets.send_button}
      alt=''
      className='w-7 cursor-pointer hover:opacity-90 transition'
    />
  </div>
</div>

  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} className='max-w-16' alt='' />
        <p className='text-xl font-semibold text-orange-950 font-[Segoe UI] tracking-wide'>
        Chat anytime, anywhere
    </p>
    </div>
  )

}

export default ChatContainer
