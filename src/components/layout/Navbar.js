'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'calculation',
      title: 'Тооцоолол',
      subtitle: 'Төлөвлөгөө гаргах',
      href: '/calculation',
      isActive: pathname === '/calculation'
    },
    {
      id: 'ai-chat',
      title: 'AI Чат',
      subtitle: 'Чиглүүлэг тусламж',
      href: '/ai-chat',
      isActive: pathname === '/ai-chat'
    },
    {
      id: 'for-you',
      title: 'Танд зориулав',
      subtitle: 'Эвэнт, Кампэйн, Мэдээ',
      href: '/for-you',
      isActive: pathname === '/for-you'
    }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link href="/calculation" className="flex items-center space-x-2">
              <img src="/icons/svg/mainlogo.svg" alt="Alluneed" className="h-14 w-14" />
              <span className="text-xl font-bold text-gray-900">Alluneed</span>
            </Link>
          </div>

          {/* Center - Navigation Items (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center space-x-3 relative group"
              >
                <div className="w-14 h-14 relative flex-shrink-0">
                  {item.id === 'calculation' && (
                    <img src="/icons/svg/calculator.svg" alt="Calculator" className="w-14 h-14" />
                  )}
                  {item.id === 'ai-chat' && (
                    <img src="/icons/svg/aichat.svg" alt="AI Chat" className="w-14 h-14" />
                  )}
                  {item.id === 'for-you' && (
                    <img src="/icons/svg/plante.svg" alt="For You" className="w-14 h-14" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.subtitle}
                  </div>
                </div>
                {/* Active indicator line */}
                {item.isActive && (
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-black"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Login Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop Login Button */}
            <div className="hidden lg:flex items-center">
              {!isLoggedIn ? (
                <Link href="/login" className="bg-black text-white px-4 py-2 rounded-2xl flex items-center space-x-2 hover:bg-[#09090B] transition-colors cursor-pointer">
                  <span className="text-sm font-medium">Нэвтрэх</span>
                  <img src="/icons/svg/userlogin.svg" alt="Login" className="w-5 h-5" />
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <img src="/icons/svg/userlogin.svg" alt="User" className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-gray-700">User</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 relative flex-shrink-0">
                      {item.id === 'calculation' && (
                        <img src="/icons/svg/calculator.svg" alt="Calculator" className="w-10 h-10" />
                      )}
                      {item.id === 'ai-chat' && (
                        <img src="/icons/svg/aichat.svg" alt="AI Chat" className="w-10 h-10" />
                      )}
                      {item.id === 'for-you' && (
                        <img src="/icons/svg/plante.svg" alt="For You" className="w-10 h-10" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.subtitle}
                      </div>
                    </div>
                    {item.isActive && (
                      <div className="ml-auto w-2 h-2 bg-black rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Login Button */}
              <div className="pt-4 border-t border-gray-200">
                {!isLoggedIn ? (
                  <Link href="/login" className="w-full bg-black text-white px-4 py-3 rounded-2xl flex items-center justify-center space-x-2 hover:bg-[#09090B] transition-colors cursor-pointer">
                    <span className="text-sm font-medium">Нэвтрэх</span>
                    <img src="/icons/svg/userlogin.svg" alt="Login" className="w-5 h-5" />
                  </Link>
                ) : (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <img src="/icons/svg/userlogin.svg" alt="User" className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-gray-700">User</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 