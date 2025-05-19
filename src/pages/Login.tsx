
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock login
    setTimeout(() => {
      setLoading(false);
      if (username && password) {
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error("Please enter both username and password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fithabit-red mb-2">FitHabit</h1>
          <p className="text-fithabit-gray">Your fun and strict fitness coach</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-6">Log in to your account</h2>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-primary w-full"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary w-full"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white mb-4"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="flex justify-between text-sm">
              <Link to="/forgot-username" className="text-fithabit-red hover:underline">Find ID</Link>
              <Link to="/forgot-password" className="text-fithabit-red hover:underline">Find Password</Link>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-fithabit-gray">
            Don't have an account? 
            <Link to="/signup" className="text-fithabit-red hover:underline ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
