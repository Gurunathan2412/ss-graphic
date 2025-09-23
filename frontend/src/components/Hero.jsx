
import React from 'react'
import { FiPrinter, FiClock, FiAward } from 'react-icons/fi'

export default function Hero() {
  const features = [
    { icon: FiPrinter, text: "Professional Quality" },
    { icon: FiClock, text: "Quick Turnaround" },
    { icon: FiAward, text: "Satisfaction Guaranteed" }
  ]

  return (
    <section className="min-h-screen relative flex flex-col justify-center pt-20 pb-16 lg:pt-28">
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <img 
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop" 
          alt="Printing Press"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="block">High-Quality Printing,</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Made Simple.
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
            From business cards to banners, Printly delivers professional results with quick turnaround times.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#services" 
               className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg 
                         font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Explore Services
            </a>
           
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto lg:mx-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-lg">
                <feature.icon className="w-6 h-6 text-indigo-400" />
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
