
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { 
  FiUser, FiMail, FiPhone, FiPackage, FiUpload, 
  FiCheck, FiArrowRight, FiX, FiFileText, 
  FiCreditCard, FiDollarSign, FiImage 
} from 'react-icons/fi';

function BookingDialog({ open, onClose, service }) {
  if (!open) return null;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    quantity: 1,
    special_requests: '',
    service: ''
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setForm(f => ({ ...f, service: service.title }));
    }
    // Reset state when dialog opens
    if (open) {
      setStep(1);
      setErrors({});
      setFile(null);
      setFilePreview(null);
      setForm(f => ({
        ...f,
        full_name: '',
        email: '',
        phone: '',
        quantity: 1,
        special_requests: '',
        service: service?.title || ''
      }));
    }
  }, [service, open]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const validateCurrentStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.full_name) newErrors.full_name = 'Name is required';
      if (!form.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else if (step === 2) {
      if (!form.service) {
        newErrors.service = 'Service is required';
      }
      if (!form.quantity || form.quantity < 1) {
        newErrors.quantity = 'Quantity must be at least 1';
      }
    }
    // Step 3 validation handled separately in canSubmit
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getTotalPrice = () => {
    if (!service?.price) return 0;
    const basePrice = parseInt(service.price.replace(/[^0-9]/g, ''));
    return basePrice * form.quantity;
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep(step + 1);
    }
  };

  const canSubmit = () => {
    return step === 2 && validateCurrentStep();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!canSubmit()) {
      return;
    }

    setLoading(true);
    try {
      let design_url = null;
      
      if (file) {
        // Upload file
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
        
        const { error: upErr } = await supabase.storage
          .from('designs')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (upErr) throw upErr;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('designs')
          .getPublicUrl(fileName);
          
        design_url = urlData.publicUrl;
      }

      const { error } = await supabase.from('bookings').insert([{
        ...form,
        design_url,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      alert('Your booking request has been submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Booking submission error:', err);
      alert('Error submitting your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white flex-shrink-0">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <service.icon className="w-5 h-5" />
            {service?.title}
          </h3>
          <div className="text-sm opacity-90 mt-1">Fill in the details below to place your order</div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          {[
            { icon: FiUser, label: 'Personal Info' },
            { icon: FiFileText, label: 'Order Details' }
          ].map((s, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            
            return (
              <div key={s.label} className="flex flex-col items-center relative">
                {i > 0 && (
                  <div 
                    className="absolute w-full h-0.5 top-4 -left-1/2 -z-10"
                    style={{
                      background: `linear-gradient(to right, 
                        ${step > i ? '#4F46E5' : '#E5E7EB'} 50%, 
                        ${step > i + 1 ? '#4F46E5' : '#E5E7EB'} 50%
                      )`
                    }}
                  />
                )}
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-indigo-600 text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-500'} 
                    transition-all duration-300`}
                >
                  {isCompleted ? <FiCheck className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <div className={`mt-2 text-xs font-medium
                  ${isActive ? 'text-indigo-600' : 
                    isCompleted ? 'text-green-500' : 
                    'text-gray-500'}`}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 overflow-y-auto">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.full_name ? 'border-red-500' : 'border-gray-300'} 
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    placeholder="Enter your full name"
                    value={form.full_name}
                    onChange={e => setForm({...form, full_name: e.target.value})}
                  />
                </div>
                {errors.full_name && <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>}
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 
                             focus:border-indigo-500 transition-colors"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
          )}

          {/* Step 2: Order Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                <input 
                  type="number"
                  min="1"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} 
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                  value={form.quantity}
                  onChange={e => setForm({...form, quantity: Number(e.target.value)})}
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 
                           focus:border-indigo-500 transition-colors min-h-[100px]"
                  placeholder="Any special requirements or notes..."
                  value={form.special_requests}
                  onChange={e => setForm({...form, special_requests: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design File (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    id="design-upload"
                    className="hidden" 
                    onChange={e => setFile(e.target.files[0])}
                    accept="image/*,.pdf"
                  />
                  {filePreview ? (
                    <div>
                      <img src={filePreview} alt="Preview" className="max-h-40 mx-auto mb-4 rounded" />
                      <button 
                        type="button"
                        onClick={() => { setFile(null); setFilePreview(null) }}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="design-upload" 
                      className="cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <div className="text-4xl mb-2">📁</div>
                      <div className="font-medium">Drop your design file here</div>
                      <div className="text-sm text-gray-500">or click to browse (optional)</div>
                    </label>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Estimated Total:</div>
                <div className="text-2xl font-bold text-indigo-600">₹{getTotalPrice()}</div>
              </div>
            </div>
          )}

          </div>
          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between items-center flex-shrink-0 pt-4 border-t">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Back
                </button>
              )}
            </div>
            <div className="flex gap-4">
              {step === 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700
                    transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
              )}
              {step === 2 && (
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white font-medium
                    bg-green-600 hover:bg-green-700
                    transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Loading...' : 'Submit Order'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


export default BookingDialog;
