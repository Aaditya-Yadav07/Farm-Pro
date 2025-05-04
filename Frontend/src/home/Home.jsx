import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import AvailableCrops from '../components/AvailableCrops'
import Landlease from '../components/Landlease'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar/>
        <Banner/>
        <AvailableCrops/>
        <Landlease/>
        <Footer/>  
    </>
  )
}

export default Home
