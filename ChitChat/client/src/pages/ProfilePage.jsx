import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl bg-white/20 backdrop-blur-2xl text-[#5d4037] border border-white/30 shadow-xl flex items-center justify-between max-sm:flex-col-reverse rounded-2xl'>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-2xl font-semibold text-[#6d4c41]'>Profile Details</h3>

          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer text-[#4e342e] hover:text-[#6d4c41] transition'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden 
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
              alt=''
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            required
            placeholder='Your name'
            className='p-2 rounded-md border border-[#bcaaa4] bg-white/50 text-[#4e342e] placeholder:text-[#6d4c41]/70 focus:outline-none focus:ring-2 focus:ring-[#a1887f]'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            required
            placeholder='Write profile bio'
            rows={4}
            className='p-2 rounded-md border border-[#bcaaa4] bg-white/50 text-[#4e342e] placeholder:text-[#6d4c41]/70 focus:outline-none focus:ring-2 focus:ring-[#a1887f]'
          ></textarea>

          <button
            type='submit'
            className='bg-gradient-to-r from-[#a97155] to-[#6b4f3b] text-white p-2 rounded-full text-lg font-semibold hover:opacity-90 transition'
          >
            Save
          </button>
        </form>

        {/* Profile Image Preview */}
        <img
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`}
          src={authUser?.profilePic || assets.logo_icon}
          alt=''
        />
      </div>
    </div>
  )
}

export default ProfilePage
