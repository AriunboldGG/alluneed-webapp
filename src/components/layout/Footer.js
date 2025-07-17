'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return React.createElement('footer', { className: 'bg-gray-900 text-white' }, [
    React.createElement('div', { key: 'container', className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12' }, [
      React.createElement('div', { key: 'grid', className: 'grid grid-cols-1 md:grid-cols-4 gap-8' }, [
        // Company Info
        React.createElement('div', { key: 'company', className: 'col-span-1 md:col-span-2' }, [
          React.createElement('div', { key: 'logo', className: 'flex items-center mb-4' }, [
            React.createElement('span', { key: 'logo-text', className: 'text-xl font-bold text-blue-400' }, 'AllYouNeed')
          ]),
          React.createElement('p', { key: 'description', className: 'text-gray-300 mb-4 max-w-md' }, 
            'Your all-in-one platform for everything you need. Streamline your workflow, manage your projects, and achieve your goals with our comprehensive solution.'
          ),
          React.createElement('div', { key: 'social', className: 'flex space-x-4' }, [
            React.createElement('a', {
              key: 'twitter',
              href: '#',
              className: 'text-gray-400 hover:text-white transition-colors',
              'aria-label': 'Twitter'
            }, [
              React.createElement('svg', {
                key: 'twitter-icon',
                className: 'h-6 w-6',
                fill: 'currentColor',
                viewBox: '0 0 24 24'
              }, [
                React.createElement('path', {
                  key: 'twitter-path',
                  d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
                })
              ])
            ]),
            React.createElement('a', {
              key: 'linkedin',
              href: '#',
              className: 'text-gray-400 hover:text-white transition-colors',
              'aria-label': 'LinkedIn'
            }, [
              React.createElement('svg', {
                key: 'linkedin-icon',
                className: 'h-6 w-6',
                fill: 'currentColor',
                viewBox: '0 0 24 24'
              }, [
                React.createElement('path', {
                  key: 'linkedin-path',
                  d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
                })
              ])
            ]),
            React.createElement('a', {
              key: 'github',
              href: '#',
              className: 'text-gray-400 hover:text-white transition-colors',
              'aria-label': 'GitHub'
            }, [
              React.createElement('svg', {
                key: 'github-icon',
                className: 'h-6 w-6',
                fill: 'currentColor',
                viewBox: '0 0 24 24'
              }, [
                React.createElement('path', {
                  key: 'github-path',
                  d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                })
              ])
            ])
          ])
        ]),

        // Quick Links
        React.createElement('div', { key: 'quick-links' }, [
          React.createElement('h3', { key: 'quick-title', className: 'text-lg font-semibold mb-4' }, 'Quick Links'),
          React.createElement('ul', { key: 'quick-list', className: 'space-y-2' }, [
            React.createElement('li', { key: 'features' }, [
              React.createElement(Link, {
                key: 'features-link',
                href: '/features',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Features')
            ]),
            React.createElement('li', { key: 'pricing' }, [
              React.createElement(Link, {
                key: 'pricing-link',
                href: '/pricing',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Pricing')
            ]),
            React.createElement('li', { key: 'docs' }, [
              React.createElement(Link, {
                key: 'docs-link',
                href: '/docs',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Documentation')
            ]),
            React.createElement('li', { key: 'api' }, [
              React.createElement(Link, {
                key: 'api-link',
                href: '/api',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'API')
            ])
          ])
        ]),

        // Support
        React.createElement('div', { key: 'support' }, [
          React.createElement('h3', { key: 'support-title', className: 'text-lg font-semibold mb-4' }, 'Support'),
          React.createElement('ul', { key: 'support-list', className: 'space-y-2' }, [
            React.createElement('li', { key: 'help' }, [
              React.createElement(Link, {
                key: 'help-link',
                href: '/help',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Help Center')
            ]),
            React.createElement('li', { key: 'contact' }, [
              React.createElement(Link, {
                key: 'contact-link',
                href: '/contact',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Contact Us')
            ]),
            React.createElement('li', { key: 'status' }, [
              React.createElement(Link, {
                key: 'status-link',
                href: '/status',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'System Status')
            ]),
            React.createElement('li', { key: 'feedback' }, [
              React.createElement(Link, {
                key: 'feedback-link',
                href: '/feedback',
                className: 'text-gray-300 hover:text-white transition-colors'
              }, 'Feedback')
            ])
          ])
        ])
      ]),

      // Bottom Section
      React.createElement('div', { key: 'bottom', className: 'border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center' }, [
        React.createElement('p', { key: 'copyright', className: 'text-gray-400 text-sm' }, '© 2024 AllYouNeed. All rights reserved.'),
        React.createElement('div', { key: 'legal', className: 'flex space-x-6 mt-4 md:mt-0' }, [
          React.createElement(Link, {
            key: 'privacy',
            href: '/privacy',
            className: 'text-gray-400 hover:text-white text-sm transition-colors'
          }, 'Privacy Policy'),
          React.createElement(Link, {
            key: 'terms',
            href: '/terms',
            className: 'text-gray-400 hover:text-white text-sm transition-colors'
          }, 'Terms of Service'),
          React.createElement(Link, {
            key: 'cookies',
            href: '/cookies',
            className: 'text-gray-400 hover:text-white text-sm transition-colors'
          }, 'Cookie Policy')
        ])
      ])
    ])
  ]);
} 