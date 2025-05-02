import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { title: 'Home', targetId: 'home' },
  { title: 'Projects', targetId: 'projects' },
  { title: 'About', targetId: 'about' },
  { title: 'Contact', targetId: 'contact' }
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    } else {
      scrollToSection(targetId);
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-dark-200/95 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl
