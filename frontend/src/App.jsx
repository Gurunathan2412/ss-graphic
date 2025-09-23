
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}
