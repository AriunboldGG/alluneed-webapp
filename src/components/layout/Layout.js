'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/hooks/useAuth';
import Header from './Header';
import Footer from './Footer';
import CalculatorBar from '../CalculatorBar';
import FilterSection from '../FilterSection';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isCalculationPage = pathname === '/calculation';

  return React.createElement(AuthProvider, {}, [
    React.createElement('div', { key: 'layout', className: 'min-h-screen flex flex-col' }, [
      React.createElement(Header, { key: 'header' }),
      isCalculationPage && React.createElement(FilterSection, { key: 'filter-section' }),
      React.createElement('main', { key: 'main', className: 'flex-1' }, children),
      React.createElement(Footer, { key: 'footer' }),
      isCalculationPage && React.createElement(CalculatorBar, { key: 'calculator-bar' })
    ])
  ]);
} 