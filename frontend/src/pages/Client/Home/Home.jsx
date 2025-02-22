import React from 'react'
import style from "./home.module.css"
import useFetch from "../../../hooks/useFetch.js"
import Header from '../../../components/Header/Header.jsx'
import Featured from '../../../components/Featured/Featured.jsx'
import FProperties from '../../../components/FProperties/FProperties.jsx'
import PropertyList from '../../../components/PropList/PropertyList.jsx'
import MailInput from '../../../components/MailInput/MailInput.jsx'
import url from "../../../utils/baseUrl.js"

const Home = () => {
  const { data, loading, error}=useFetch()

  return (
    <>
    <Header />
    <div className={style.home_container}>
      {loading ? (
        <p>Loading, please wait...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {/* <h1 className='homeTitle max-w-5xl text-2xl font-bold self-baseline pl-44'>Explore Azerbaijan</h1> */}
          <Featured />
          <h1 className="homeTitle max-w-5xl text-2xl font-bold self-baseline pl-44">
            Browse by property type
          </h1>
          <PropertyList />
          <h1 className="homeTitle max-w-5xl text-2xl font-bold self-baseline pl-44">
            Homes guests love
          </h1>
          <FProperties />
          <MailInput />
        </>
      )}
    </div>
  </>
  )
}

export default Home
