
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Activity, Clock, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Friends', path: '/friends', icon: <Users className="w-5 h-5" /> },
    { name: 'InBody', path: '/inbody', icon: <Activity className="w-5 h-5" /> },
    { name: 'App Restriction', path: '/app-restriction', icon: <Clock className="w-5 h-5" /> },
    { name: 'Character', path: '/character', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 bg-white border-b border-fithabit-gray-light z-30">
      <div className="container-app flex items-center justify-between py-3">
        <Link to="/" className="flex items-center">
          <span className="text-fithabit-red font-bold text-xl">FitHabit</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-fithabit-gray hover:text-fithabit-red"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-1 text-fithabit-gray hover:text-fithabit-red transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-fithabit-gray-light">
          <div className="container-app py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 py-2 text-fithabit-gray hover:text-fithabit-red transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
