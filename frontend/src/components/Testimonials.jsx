
import React, { useEffect, useState } from 'react'
const TESTIMONIALS = [
  { quote: 'Fast turnaround and excellent quality!', name: 'Ravi Kumar', title: 'Founder, ABC Co', avatar: 'https://i.pravatar.cc/80?img=12' },
  { quote: 'Great communication and vibrant prints.', name: 'Sana Mehta', title: 'Marketing Lead', avatar: 'https://i.pravatar.cc/80?img=5' },
  { quote: 'Superb service and on-time delivery.', name: 'Arjun Patel', title: 'Operations', avatar: 'https://i.pravatar.cc/80?img=8' }
]
export default function Testimonials(){
  const [idx, setIdx] = useState(0)
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=> (i+1)%TESTIMONIALS.length), 4000); return ()=>clearInterval(t) },[])
  return (
    <section id="testimonials" className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div className="bg-white rounded-lg p-6 shadow min-h-[160px] flex items-center gap-4">
        <img src={TESTIMONIALS[idx].avatar} className="w-16 h-16 rounded-full" />
        <div>
          <p className="italic">"{TESTIMONIALS[idx].quote}"</p>
          <div className="mt-2 font-semibold">{TESTIMONIALS[idx].name} <span className="text-sm text-gray-500">— {TESTIMONIALS[idx].title}</span></div>
        </div>
      </div>
    </section>
  )
}
