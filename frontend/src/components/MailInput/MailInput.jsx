import React from 'react'

const MailInput = () => {
    return (
        <div className="mail w-full mt-12 bg-[#1C0F6E] text-white flex flex-col items-center justify-center  gap-5 p-12">
          <h1 className="mailTitle font-bold text-3xl text-center">Save time, save money!</h1>
          <span className="mailDesc text-sm">Sign up and we'll send the best deals to you</span>
          <div className="mailInputContainer flex ">
            <input className='w-76 h-8 p-2 mr-2 rounded-md' type="text" placeholder="Your Email" />
            <button className='h-8 px-2 bg-yellow-500 text-white font-bold rounded-lg cursor-pointer'>Subscribe</button>
          </div>
        </div>
      )
}

export default MailInput
