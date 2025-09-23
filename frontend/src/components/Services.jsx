
import React, { useState } from 'react'
import { FiPrinter, FiImage, FiFlag } from 'react-icons/fi'
import BookingDialog from './BookingDialog'

const SERVICES = [
  { 
    id: 'bc', 
    title: 'Business Cards', 
    desc: 'Premium matte or gloss business cards with professional finishes.',
    price: '₹299 starting', 
    image: 'https://images.unsplash.com/photo-1596484552252-0378607c2d3b?q=80&w=800&auto=format&fit=crop',
    icon: FiPrinter,
    popular: true,
    features: ['Premium card stock', 'Full color printing', 'Quick turnaround']
  },
  { 
    id: 'fl', 
    title: 'Flyers', 
    desc: 'Double-sided full color flyers perfect for promotions.',
    price: '₹499 starting', 
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=800&auto=format&fit=crop',
    icon: FiImage,
    features: ['High-quality paper', 'Double-sided printing', 'Bulk discounts']
  },
  { 
    id: 'bn', 
    title: 'Banners', 
    desc: 'Eye-catching vinyl banners for maximum impact.',
    price: '₹999 starting', 
    image: 'https://images.unsplash.com/photo-1591012911203-3b9a8a9d8a8b?q=80&w=800&auto=format&fit=crop',
    icon: FiFlag,
    features: ['Weather-resistant', 'Multiple sizes', 'Grommets included']
  }
]
export default function Services(){
  const [open,setOpen] = useState(false)
  const [selected,setSelected] = useState(null)
  return (
    <section id="services" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Choose from our range of professional printing services, all delivered with exceptional quality and quick turnaround times.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(s => (
          <div key={s.id} 
               className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                        transform hover:-translate-y-1 overflow-hidden">
            <div className="relative">
              <img src={s.image} alt={s.title} 
                   className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              {s.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                              text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                  Popular Choice
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <s.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl">{s.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{s.desc}</p>
              
              <ul className="space-y-2 mb-6">
                {s.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-indigo-600 font-bold text-lg">{s.price}</div>
                <button 
                  onClick={() => { setSelected(s); setOpen(true) }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg
                            hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BookingDialog open={open} onClose={()=>setOpen(false)} service={selected} />
    </section>
  )
}
