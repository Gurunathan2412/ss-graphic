import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#services', text: 'Services' },
    { href: '#testimonials', text: 'Testimonials' },
    { href: '#faq', text: 'FAQ' },
    { href: '/admin', text: 'Admin' } // Added Admin link
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-md bg-white/80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 
                          flex items-center justify-center text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
              P
            </div>
            <div className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Printly
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} 
                 href={link.href} 
                 className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                {link.text}
              </a>
            ))}
            <a href="#contact" 
               className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg 
                          shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-md`}>
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map(link => (
              <a key={link.href} 
                 href={link.href}
                 onClick={() => setMobileMenuOpen(false)}
                 className="text-gray-600 hover:text-indigo-600 transition-colors py-2">
                {link.text}
              </a>
            ))}
            <a href="#contact"
               onClick={() => setMobileMenuOpen(false)}
               className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg py-3 px-4 
                          text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Book Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
