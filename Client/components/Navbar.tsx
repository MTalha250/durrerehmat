"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full max-w-screen-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 shadow-lg backdrop-blur-md"
            : "bg-white/90 shadow-md backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 md:px-16 lg:px-24 xl:px-32">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative overflow-hidden rounded-full">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <p className="text-primary text-sm font-bold tracking-wide">
                DURRE-E-REHMAT
              </p>
              <p className="text-secondary text-xs font-medium tracking-[3px] opacity-80">
                FOUNDATION
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`hover:text-primary group relative font-medium transition-all duration-300 ${
                      isActiveLink(item.href)
                        ? "text-primary"
                        : "hover:text-primary text-gray-700"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`bg-primary absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                        isActiveLink(item.href)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Donate Button */}
            <Link
              href="/donate"
              className="from-primary to-primary/80 group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r px-6 py-2.5 font-semibold text-white transition-all duration-300"
            >
              <span className="relative z-10">Donate Now</span>
              <ChevronRightIcon
                size={18}
                strokeWidth={2}
                className="relative z-10 transition-all duration-300 group-hover:translate-x-1"
              />
              <div className="from-primary/80 to-secondary absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-full left-0 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
            isMobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-4 opacity-0"
          }`}
        >
          <div className="space-y-4 px-8 py-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                  isActiveLink(item.href)
                    ? "bg-primary/10 text-primary border-primary border-l-4"
                    : "hover:text-primary text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="from-primary to-primary/80 mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 font-semibold text-white transition-all duration-300"
            >
              Donate Now
              <ChevronRightIcon size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
