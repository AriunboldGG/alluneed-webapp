'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    try {
      // Here you would typically make an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's just redirect to calculation page
      router.push('/calculation');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col space-y-6">
          {/* Logo and Title */}
          <div className="flex flex-col space-y-2 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <img src="/icons/svg/mainlogo.svg" alt="Alluneed" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Alluneed</span>
            </Link>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Нэвтрэх</h1>
              <p className="text-sm text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Account</h2>
                <p className="text-sm text-gray-500">
                  Enter your username and password to login to your account
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-[#09090B] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <p className="text-gray-500">
                  Don't have an account? Contact us to get your credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 