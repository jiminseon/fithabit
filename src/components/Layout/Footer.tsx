
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-fithabit-gray-light py-6 mt-auto">
      <div className="container-app">
        <div className="flex flex-col md:flex-row justify-between items-center text-fithabit-gray text-sm">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-fithabit-red font-bold text-lg">FitHabit</span>
            </Link>
            <p className="mt-2">Your fun and strict fitness coach</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-fithabit-red transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-fithabit-red transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-fithabit-red transition-colors">Terms</Link>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-fithabit-gray">
          &copy; {new Date().getFullYear()} FitHabit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
