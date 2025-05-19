
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("모든 필드를 입력해주세요");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다");
      return;
    }
    
    setLoading(true);
    
    // Mock signup
    setTimeout(() => {
      setLoading(false);
      // Save to localStorage
      localStorage.setItem('username', formData.username);
      toast.success("계정이 성공적으로 생성되었습니다!");
      navigate('/login');
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
          <h2 className="text-xl font-semibold mb-6">계정 만들기</h2>
          
          <form onSubmit={handleSignup}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">사용자 이름</label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="사용자 이름 선택"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">이메일</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="이메일 입력"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">비밀번호</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="비밀번호 생성"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">비밀번호 확인</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white mb-4"
              disabled={loading}
            >
              {loading ? '계정 생성 중...' : '회원가입'}
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-fithabit-gray">
            이미 계정이 있으신가요?
            <Link to="/login" className="text-fithabit-red hover:underline ml-1">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
