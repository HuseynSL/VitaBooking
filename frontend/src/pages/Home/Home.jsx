import React from 'react'
import style from "./home.module.css"
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import Featured from '../../components/Featured/Featured'
import FProperties from '../../components/FProperties/FProperties'
import PropertyList from '../../components/PropList/PropertyList'
import MailInput from '../../components/MailInput/MailInput'


const Home = () => {
  return (
    <>
      <Header/>
      <div className={style.home_container}>
        <Featured/>
        <h1 className="homeTitle max-w-5xl text-2xl font-bold self-baseline pl-44">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle max-w-5xl text-2xl font-bold self-baseline pl-44">Homes guests love</h1>
        <FProperties/>
        <MailInput/>
      </div>
    
    </>
  )
}

export default Home
