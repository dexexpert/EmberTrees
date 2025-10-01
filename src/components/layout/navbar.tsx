'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/logo.svg" alt="EmberTrees" width={120} height={40} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Middle - Desktop Navigation (hidden on mobile) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex space-x-8">
                <Link href="/home" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Home</Link>
                <Link href="/menu" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Menu</Link>
                <Link href="/delivery" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Delivery</Link>
                <Link href="/how-it-works" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">How it Works</Link>
                <Link href="/blogs" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Blogs</Link>
                <Link href="/admin" className="text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Admin</Link>
              </div>
            </div>

            {/* Right - Sign In & Cart */}
            <div className="flex items-center space-x-4">
              {/* Sign In - Desktop only */}
              <Link href="/signin" className="hidden lg:block text-gray-700 hover:text-orange-500 px-3 py-2 text-sm font-medium">Sign In</Link>

              {/* Cart Icon */}
              <Link href="/cart" className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5.8A2 2 0 007.9 21h8.2a2 2 0 001.9-2.2L16 13M7 13v-2m6 0V9a3 3 0 616 0v2" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">

            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMenuOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="px-6 py-4 text-center border-b">
              <Image src="/logo.svg" alt="EmberTrees" width={120} height={40} className="h-10 w-auto mx-auto" />
            </div>

            {/* Mobile Links */}
            <div className="px-6 py-6 space-y-4">
              <Link href="/home" className="flex items-center space-x-3 py-3">
                <span>🏠</span><span>Home</span>
              </Link>
              <Link href="/menu" className="flex items-center space-x-3 py-3">
                <span>📖</span><span>Menu</span>
              </Link>
              <Link href="/delivery" className="flex items-center space-x-3 py-3">
                <span>🚚</span><span>Delivery</span>
              </Link>
              <Link href="/how-it-works" className="flex items-center space-x-3 py-3">
                <span>❓</span><span>How it Works</span>
              </Link>
              <Link href="/blogs" className="flex items-center space-x-3 py-3">
                <span>📰</span><span>Blogs</span>
              </Link>

              {/* Sign In Button */}
              <div className="mt-8 pt-6 border-t">
                <Link href="/signin" className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}