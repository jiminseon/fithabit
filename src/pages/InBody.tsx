
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { InBodyStats } from '@/components/InBody/InBodyStats';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { toast } from 'sonner';

const InBody = () => {
  // State for inBody data
  const [inBodyData, setInBodyData] = useState({
    weight: 68,
    weightGoal: 65,
    muscleMass: 32,
    muscleMassGoal: 35,
    bodyFat: 22,
    bodyFatGoal: 18,
    lastUpdated: '2023-05-10',
    nextScheduled: '2023-06-10',
  });
  
  // Form state for goals
  const [formGoals, setFormGoals] = useState({
    weightGoal: inBodyData.weightGoal,
    muscleMassGoal: inBodyData.muscleMassGoal,
    bodyFatGoal: inBodyData.bodyFatGoal,
  });
  
  // Mock history data
  const mockHistory = [
    { date: '2023-05-10', weight: 68, muscleMass: 32, bodyFat: 22 },
    { date: '2023-04-10', weight: 69, muscleMass: 31.5, bodyFat: 23 },
    { date: '2023-03-10', weight: 70.5, muscleMass: 31, bodyFat: 24 },
  ];
  
  // Mock AI feedback
  const mockFeedback = "체지방 감소에 좋은 진전을 보이고 계십니다! 올바른 방향으로 나아가고 있습니다. 현재 유산소 운동을 계속하면서 근육량 증가를 위해 단백질 섭취를 늘려보세요.";
  
  // Handle form input changes
  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormGoals(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  // Handle goal update submission
  const updateGoals = () => {
    setInBodyData(prev => ({
      ...prev,
      weightGoal: formGoals.weightGoal,
      muscleMassGoal: formGoals.muscleMassGoal,
      bodyFatGoal: formGoals.bodyFatGoal,
    }));
    toast.success("목표가 업데이트되었습니다!");
  };
  
  // Function to schedule next inBody scan
  const scheduleInBody = () => {
    // In a real app, this would open a date picker or form
    toast.success("인바디 스캔 예약이 열립니다!");
  };

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">인바디 결과</h1>
          <p className="text-fithabit-gray">시간에 따른 신체 변화를 추적하세요.</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">현재 상태</h2>
            <Button 
              className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
              onClick={scheduleInBody}
            >
              <Calendar className="w-4 h-4 mr-1" />
              다음 스캔 예약
            </Button>
          </div>
          <InBodyStats {...inBodyData} />
        </div>
        
        {/* AI Feedback */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI 피드백</h2>
          <div className="bg-white rounded-xl p-6 card-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-fithabit-red text-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit">
                  <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
                  <path d="m15.7 10.4-.9.4" />
                  <path d="m9.2 13.2-.9.4" />
                  <path d="m13.6 15.7-.4-.9" />
                  <path d="m10.8 9.2-.4-.9" />
                  <path d="m15.7 13.5-.9-.4" />
                  <path d="m9.2 10.7-.9-.4" />
                  <path d="m10.5 15.7.4-.9" />
                  <path d="m13.3 9.2.4-.9" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-2">진행 상황 분석</h3>
                <p className="text-fithabit-gray">{mockFeedback}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">기록</h2>
          <div className="bg-white rounded-xl overflow-hidden card-shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">날짜</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">체중 (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">근육량 (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">체지방 (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fithabit-gray-light">
                {mockHistory.map((entry, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm text-fithabit-gray-dark">{entry.date}</td>
                    <td className="px-6 py-4 text-sm text-fithabit-gray-dark">{entry.weight}</td>
                    <td className="px-6 py-4 text-sm text-fithabit-gray-dark">{entry.muscleMass}</td>
                    <td className="px-6 py-4 text-sm text-fithabit-gray-dark">{entry.bodyFat}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Set Goals */}
        <div>
          <h2 className="text-xl font-semibold mb-4">목표 설정</h2>
          <div className="bg-white rounded-xl p-6 card-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">체중 목표 (kg)</label>
                <input 
                  type="number" 
                  name="weightGoal"
                  value={formGoals.weightGoal}
                  onChange={handleGoalChange}
                  className="input-primary w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">근육량 목표 (kg)</label>
                <input 
                  type="number" 
                  name="muscleMassGoal"
                  value={formGoals.muscleMassGoal}
                  onChange={handleGoalChange}
                  className="input-primary w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">체지방 목표 (%)</label>
                <input 
                  type="number" 
                  name="bodyFatGoal"
                  value={formGoals.bodyFatGoal}
                  onChange={handleGoalChange}
                  className="input-primary w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <Button 
              className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
              onClick={updateGoals}
            >
              목표 업데이트
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InBody;
