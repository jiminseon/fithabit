
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, Activity, Clock, User, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const navItems = [
    { name: '홈', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: '친구', path: '/friends', icon: <Users className="w-5 h-5" /> },
    { name: '인바디', path: '/inbody', icon: <Activity className="w-5 h-5" /> },
    { name: '앱 제한', path: '/app-restriction', icon: <Clock className="w-5 h-5" /> },
    { name: '캐릭터', path: '/character', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 bg-white border-b border-fithabit-gray-light z-30">
      <div className="container-app flex items-center justify-between py-3">
        <Link to="/" className="flex items-center">
          <span className="text-fithabit-red font-bold text-xl">FitHabit</span>
        </Link>
        
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
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleLoginClick}
            variant="outline"
            className="hidden md:flex items-center gap-1 border-fithabit-red text-fithabit-red hover:bg-fithabit-red hover:text-white"
          >
            <LogIn className="w-4 h-4" />
            <span>로그인</span>
          </Button>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-fithabit-gray hover:text-fithabit-red"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            <Button 
              onClick={handleLoginClick}
              variant="outline"
              className="w-full flex items-center justify-center gap-1 mt-2 border-fithabit-red text-fithabit-red hover:bg-fithabit-red hover:text-white"
            >
              <LogIn className="w-4 h-4" />
              <span>로그인</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
