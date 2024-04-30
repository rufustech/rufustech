import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Heros from '../components/Heros'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Skills from '../components/Skills'
import Partner from '../components/Partner'
import Pricing from '../components/Pricing'
import Resume from '../components/Resume'

function Home() {
  return (
    <div >
      <Header />
      {/* <Hero /> */}
      <Heros />
      <Services />
      <Skills />
      <Pricing />
      <Resume />
      <Partner />
      <Footer/>
    </div>
  )
}

export default Home
