import React from 'react'
import style from "./style.module.css"

const Footer = () => {
  return (
    <>
    
      <div className="footer w-full bg-gray-100">
        <div className={style.container}>

        <div className="flist pt-8 gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          <div className="listItem flex flex-col gap-2">
            <h3 className='font-bold'>Support</h3>
            <ul className='list text-sm flex flex-col gap-2'>
              <li>Coronavirus (COVID-19) FAQs</li>
              <li>Manage your trips</li>
              <li>Contact Customer Service</li>
              <li>Safety resource centre</li>
            </ul>
          </div>

          <div className="listItem flex flex-col gap-2">
            <h3 className='font-bold'>Discover</h3>
            <ul className='list text-sm flex flex-col gap-2'>
              <li>Genius loyalty programme</li>
              <li>Seasonal and holiday deals</li>
              <li>Travel articles</li>
              <li>Booking.com for Business</li>
              <li>Traveller Review Awards</li>
              <li>Car hire</li>
              <li>Flight finder</li>
              <li>Restaurant reservations</li>
              <li>Booking.com for Travel Agents</li>
            </ul>
          </div>

          <div className="listItem flex flex-col gap-2">
            <h3 className='font-bold'>Terms and settings</h3>
            <ul className='list text-sm flex flex-col gap-2'>
              <li>Privacy & cookies</li>
              <li>Terms and conditions</li>
              <li>Partner dispute</li>
              <li>Modern Slavery Statement</li>
              <li>Human Rights Statement</li>
            </ul>
          </div>

          <div className="listItem flex flex-col gap-2">
            <h3 className='font-bold'>Partners</h3>
            <ul className='list text-sm flex flex-col gap-2'>
              <li>Extranet login</li>
              <li>Partner help</li>
              <li>List your property</li>
              <li>Become an affiliate</li>
            </ul>
          </div>

          <div className="listItem flex flex-col gap-2">
            <h3 className='font-bold'>About</h3>
            <ul className='list text-sm flex flex-col gap-2'>
              <li>About Booking.com</li>
              <li>How we work</li>
              <li>Sustainability</li>
              <li>Press centre</li>
              <li>Careers</li>
              <li>Investor relations</li>
              <li>Corporate contact</li>
            </ul>
          </div>
        </div>

        <div className="copyright flex flex-col items-center gap-3 mt-12">
          <div className="ctext">
            <hr />  
            <h2 className='text-sm font-light text-gray-500'>Copyright @ Booking.com</h2>
          </div>
          <div className="logo w-1/4 flex grid grid-cols-4 gap-3 items-center">
            <img className='w-16' src="https://www.aztu.edu.az/sub_site/assets/dist/img/logo-footerr.png" alt="" />
            <img className='w-16 ' src="https://www.cdnlogo.com/logos/b/94/booking-com.svg" alt="" />
            <img className='w-16' src="https://www.openaire.eu/templates/yootheme/cache/0f/aztu-logo--0f2f30cc.png" alt="" />
            <p className='font-bold text-xs'><span className='text-yellow-500'>VitaBooking</span><span className='text-blue-800'>.com</span></p>
          </div>
        </div>

        </div>
      </div>

    </>
  )
}

export default Footer
