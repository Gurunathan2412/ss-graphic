
import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      navigate('/admin')
    } catch (error) {
      alert(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-sm">
        <h3 className="font-semibold mb-4">Printly Admin Login</h3>
        <input 
          className="border p-2 w-full mb-3" 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          className="border p-2 w-full" 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <div className="mt-4">
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded w-full" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}
