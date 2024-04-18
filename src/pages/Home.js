import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Heros from '../components/Heros'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Skills from '../components/Skills'
import Partner from '../components/Partner'
import Pricing from '../components/Pricing'

function Home() {
  return (
    <div >
      <Header />
      {/* <Hero /> */}
      <Heros />
      <Services />
      <Skills />
      <Pricing />
      <Partner />
      <Footer />
    </div>
  )
}

export default Home
