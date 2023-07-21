import React from 'react'
import { Helmet } from 'react-helmet-async'
import TopCarousel from '../components/Home/TopCarousel'
import HighlightText from '../components/Home/HighlightText'
import Background from '../components/Home/Background'
import Featured from '../components/Home/Featured'
import ItemTypes from '../components/Home/ItemTypes'
import TopArtists from '../components/Home/TopArtists'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  
  return (
    <div style={{position: "relative"}}>
      <Helmet>
          <title>FanArtiks</title>
      </Helmet>
      <Header />
      <HighlightText />
      <TopCarousel />
      <Featured />
      <ItemTypes />
      <TopArtists />
      <Background />
      <Footer />
    </div>
  )
}

export default Home