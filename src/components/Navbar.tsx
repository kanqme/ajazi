
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'Projects', href: '#projects' },
  { title: 'About', href: '#about' },
  { title: 'Contact', href: '#contact' }
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-dark-200/95 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold gradient-text">Portfolio</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.title}
              href={item.href}
              className="text-gray-300 hover:text-accent-purple transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-purple hover:after:w-full after:transition-all"
            >
              {item.title}
            </a>
          ))}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={cn(
        'md:hidden absolute w-full bg-dark-200/95 backdrop-blur-md transition-all duration-300 ease-in-out',
        mobileMenuOpen ? 'max-h-64 opacity-100 shadow-lg' : 'max-h-0 opacity-0 invisible'
      )}>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map((item) => (
            <a 
              key={item.title}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-accent-purple transition-colors py-2"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
