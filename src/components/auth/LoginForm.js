'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail } from '@/utils/validation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login(formData);
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || 'Login failed. Please try again.',
      });
    }
  };

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8' }, [
    React.createElement('div', { key: 'container', className: 'max-w-md w-full space-y-8' }, [
      React.createElement(Card, { key: 'card' }, [
        React.createElement(CardHeader, { key: 'header', className: 'text-center' }, [
          React.createElement(CardTitle, { key: 'title' }, 'Sign in to your account'),
          React.createElement(CardDescription, { key: 'description' }, 'Enter your credentials to access your account')
        ]),
        React.createElement(CardContent, { key: 'content' }, [
          React.createElement('form', { key: 'form', onSubmit: handleSubmit, className: 'space-y-6' }, [
            errors.general && React.createElement('div', {
              key: 'general-error',
              className: 'bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'
            }, errors.general),
            
            React.createElement(Input, {
              key: 'email',
              label: 'Email Address',
              type: 'email',
              name: 'email',
              value: formData.email,
              onChange: handleChange,
              error: errors.email,
              placeholder: 'Enter your email',
              required: true
            }),
            
            React.createElement(Input, {
              key: 'password',
              label: 'Password',
              type: 'password',
              name: 'password',
              value: formData.password,
              onChange: handleChange,
              error: errors.password,
              placeholder: 'Enter your password',
              required: true
            }),
            
            React.createElement('div', { key: 'options', className: 'flex items-center justify-between' }, [
              React.createElement('div', { key: 'remember', className: 'flex items-center' }, [
                React.createElement('input', {
                  key: 'checkbox',
                  id: 'remember-me',
                  name: 'remember-me',
                  type: 'checkbox',
                  className: 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                }),
                React.createElement('label', {
                  key: 'checkbox-label',
                  htmlFor: 'remember-me',
                  className: 'ml-2 block text-sm text-gray-900'
                }, 'Remember me')
              ]),
              
              React.createElement('div', { key: 'forgot', className: 'text-sm' }, [
                React.createElement(Link, {
                  key: 'forgot-link',
                  href: '/forgot-password',
                  className: 'font-medium text-blue-600 hover:text-blue-500'
                }, 'Forgot your password?')
              ])
            ]),
            
            React.createElement(Button, {
              key: 'submit',
              type: 'submit',
              className: 'w-full',
              loading: isLoading,
              disabled: isLoading
            }, 'Sign in'),
            
            React.createElement('div', { key: 'signup', className: 'text-center' }, [
              React.createElement('p', { key: 'text', className: 'text-sm text-gray-600' }, [
                "Don't have an account? ",
                React.createElement(Link, {
                  key: 'signup-link',
                  href: '/register',
                  className: 'font-medium text-blue-600 hover:text-blue-500'
                }, 'Sign up')
              ])
            ])
          ])
        ])
      ])
    ])
  ]);
} 