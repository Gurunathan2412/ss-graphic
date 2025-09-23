
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function StatusBadge({ status }) {
  const cls = status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
  return <span className={`px-2 py-1 rounded text-sm ${cls}`}>{status}</span>
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
      return false
    }
    return true
  }

  async function load() {
    if (!await checkAuth()) return
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      alert('Error loading bookings')
      return
    }
    setBookings(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id, status) {
    if (!await checkAuth()) return
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
    
    if (error) {
      alert('Error updating booking')
      return
    }
    load()
  }

  async function del(id) {
    if (!await checkAuth()) return
    if (!confirm('Delete this booking?')) return

    // First, get the booking to find its design_url
    const { data: booking } = await supabase
      .from('bookings')
      .select('design_url')
      .eq('id', id)
      .single()

    // If there's a design file, delete it from storage
    if (booking?.design_url) {
      const fileName = booking.design_url.split('/').pop() // Get filename from URL
      const { error: storageError } = await supabase.storage
        .from('designs')
        .remove([fileName])
      
      if (storageError) {
        console.error('Error deleting file:', storageError)
      }
    }

    // Then delete the booking
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)
    
    if (error) {
      alert('Error deleting booking')
      return
    }
    
    load()
  }

  async function logout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between shadow">
        <div className="font-semibold">Printly Admin</div>
        <div className="flex gap-3 items-center">
          <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        {loading ? <div>Loading...</div> : (
          bookings.length === 0 ? <div>No bookings found</div> : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded shadow">
                <thead><tr className="text-left border-b">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Design</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr></thead>
                <tbody>
                  {bookings.map(b=> (
                    <tr key={b.id} className="border-b">
                      <td className="p-3"><div className="font-semibold">{b.full_name}</div><div className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString()}</div></td>
                      <td className="p-3">{b.email}<br/>{b.phone}</td>
                      <td className="p-3">{b.service}</td>
                      <td className="p-3">{b.quantity}</td>
                      <td className="p-3">
                        {b.design_url ? (
                          <a 
                            href={b.design_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View Design
                          </a>
                        ) : (
                          <span className="text-gray-400">No design</span>
                        )}
                      </td>
                      <td className="p-3"><StatusBadge status={b.status} /></td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="px-2 py-1 border rounded text-sm" onClick={()=>updateStatus(b.id,'Pending')}>Pending</button>
                          <button className="px-2 py-1 border rounded text-sm" onClick={()=>updateStatus(b.id,'Completed')}>Complete</button>
                          <button className="px-2 py-1 border rounded text-sm" onClick={()=>updateStatus(b.id,'Cancelled')}>Cancel</button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded text-sm" onClick={()=>del(b.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  )
}
