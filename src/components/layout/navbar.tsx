"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ import this

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ current URL path

  // Helper to check active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="shadow-md w-full backdrop-blur-[2px] sticky top-0 z-50 bg-[#690000aa]">
        <div className="max-w-full px-4 lg:px-8 gap-[10px]">
          <div className="flex items-center justify-between py-3 md:pb-0 md:pt-[20px]">
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/nav_logo.png"
                  alt="EmberTrees"
                  width={150}
                  height={88}
                  className="md:h-[88px] md:w-[150px] h-[60px] w-[102px]"
                />
              </Link>
            </div>

            {/* Middle - Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex space-x-[18px]">
                {[
                  { href: "/", label: "Home" },
                  { href: "/menu", label: "Menu" },
                  { href: "/delivery", label: "Delivery" },
                  { href: "/how-it-works", label: "How it Works" },
                  { href: "/blogs", label: "Blogs" },
                  { href: "/admin", label: "Admin" },
                ].map((link) => (
                  <div
                    key={link.href}
                    className={`flex rounded-[42px] px-[30px] py-[12px] ${
                      isActive(link.href)
                        ? "bg-[#BF2A36] text-white"
                        : "hover:text-orange-500 text-white"
                    }`}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-center items-center justify-center align-middle flex"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Sign In & Cart */}
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="hidden lg:block text-[#BF2A36] hover:text-orange-500 bg-white rounded-[42px] px-[30px] py-[12px] text-sm font-normal"
              >
                Sign In
              </Link>

              <Link href="/cart" className="p-3 rounded-full bg-[#BF2A36]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5.8A2 2 0 007.9 21h8.2a2 2 0 001.9-2.2L16 13M7 13v-2m6 0V9a3 3 0 616 0v2"
                  />
                </svg>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white lg:hidden p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
