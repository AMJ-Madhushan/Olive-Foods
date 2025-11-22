import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import PersonalizedRecommendations from '../../components/PersonalizedRecommendations/PersonalizedRecommendations'
import OurServices from '../../components/OurServices/OurServices'
// import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  return (
    <div>
      <Header/>
      <PersonalizedRecommendations/>
      <OurServices/>
      {/* <AppDownload/> */}
    </div>
  )
}

export default Home
