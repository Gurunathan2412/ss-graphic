
import React, { useState } from 'react'
const FAQS = [
  { q: 'What file formats do you accept?', a: 'PDF, AI, EPS, PSD (flattened), high-res PNG/JPG. Vector files preferred for large prints.' },
  { q: 'What are your turnaround times?', a: 'Small orders: 24–48 hours. Large or bulk orders: 3–7 business days.' },
  { q: 'Can you match custom colors?', a: 'Yes — request Pantone color matching in special requests.' }
]
export default function FAQ(){ const [openIdx,setOpenIdx]=useState(null); return (
  <section id="faq" className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
    <div className="space-y-3">
      {FAQS.map((f,i)=> (
        <div key={i} className="border rounded">
          <button className="w-full text-left p-4" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
            <div className="flex justify-between items-center"><div>{f.q}</div><div>{openIdx===i?'-':'+'}</div></div>
          </button>
          {openIdx===i && <div className="p-4 border-t">{f.a}</div>}
        </div>
      ))}
    </div>
  </section>
) }
