
import React from 'react'
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa'
export default function Footer(){
  return (
    <footer id="contact" className="bg-white mt-8 border-t">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h4 className="font-semibold">Printly</h4>
          <div className="text-sm text-gray-600 mt-2">Email: hello@printly.example<br/>Phone: +91 98765 43210<br/>Address: 123 Print St, Mumbai, India</div>
        </div>
        <div>
          <h4 className="font-semibold">Follow us</h4>
          <div className="flex gap-3 mt-2">
            <a aria-label="twitter"><FaTwitter /></a>
            <a aria-label="facebook"><FaFacebookF /></a>
            <a aria-label="instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
