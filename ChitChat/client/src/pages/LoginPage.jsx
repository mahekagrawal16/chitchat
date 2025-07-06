import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
  }

  return (
<div className='min-h-screen bg-cover bg-center flex items-center
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2x1'>
      {/* Left Side Logo/Image */}
      <div className="absolute top-10 left-20 hidden lg:flex items-center space-x-3">
                <img src={assets.icon} alt="Icon" className="w-25 h-20" />
      </div>
    <div className="absolute left-60 hidden lg:flex items-center justify-center w-1/3 ">
        <img src={assets.logo_icon2} alt="Chat Icon" className="w-200 h-100" />
      </div>
      {/* Form Container */}
      <form onSubmit={onSubmitHandler}
        className="absolute right-80 w-full max-w-md bg-black/10 border border-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl text-orange-950 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{currState}</h2>
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
            />
          )}
        </div>

        {/* Inputs */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 bg-black/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-orange-950/80"
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
            className="w-full px-4 py-2 bg-black/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-orange-950/80"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            className="w-full px-4 py-2 bg-black/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-orange-950/80"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            required
            placeholder="Provide a short bio..."
            className="w-full px-4 py-2 bg-black/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-orange-950/80 resize-none"
          />
        )}

        {/* Submit Button */}
        <button type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#a97155] to-[#6b4f3b] rounded-md font-medium text-white hover:opacity-90 transition"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-center space-x-2 text-sm text-black">
          <input type="checkbox" className="accent-amber-900" required/>
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        {/* Toggle Sign In/Up */}
        <div className="text-center text-sm text-black">
          {currState === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
                className="font-medium text-rose-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="font-medium text-rose-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
