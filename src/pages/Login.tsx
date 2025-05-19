
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Pre-fill login form if saved in localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save username to localStorage
    if (username) {
      localStorage.setItem('username', username);
    }
    
    // Mock login
    setTimeout(() => {
      setLoading(false);
      if (username && password) {
        toast.success("로그인 성공!");
        navigate('/');
      } else {
        toast.error("사용자 이름과 비밀번호를 모두 입력해주세요");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fithabit-red mb-2">FitHabit</h1>
          <p className="text-fithabit-gray">당신의 재미있고 엄격한 피트니스 코치</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-6">계정 로그인</h2>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">사용자 이름</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-primary w-full"
                  placeholder="사용자 이름 입력"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">비밀번호</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary w-full"
                  placeholder="비밀번호 입력"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white mb-4"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
            
            <div className="flex justify-between text-sm">
              <Link to="/forgot-username" className="text-fithabit-red hover:underline">아이디 찾기</Link>
              <Link to="/forgot-password" className="text-fithabit-red hover:underline">비밀번호 찾기</Link>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-fithabit-gray">
            계정이 없으신가요? 
            <Link to="/signup" className="text-fithabit-red hover:underline ml-1">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
