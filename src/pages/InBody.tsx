
import { Layout } from '@/components/Layout/Layout';
import { InBodyStats } from '@/components/InBody/InBodyStats';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';

const InBody = () => {
  // Sample data
  const mockInBodyData = {
    weight: 68,
    weightGoal: 65,
    muscleMass: 32,
    muscleMassGoal: 35,
    bodyFat: 22,
    bodyFatGoal: 18,
    lastUpdated: '2023-05-10',
    nextScheduled: '2023-06-10',
  };
  
  const mockHistory = [
    { date: '2023-05-10', weight: 68, muscleMass: 32, bodyFat: 22 },
    { date: '2023-04-10', weight: 69, muscleMass: 31.5, bodyFat: 23 },
    { date: '2023-03-10', weight: 70.5, muscleMass: 31, bodyFat: 24 },
  ];
  
  const mockFeedback = "Great progress on reducing your body fat percentage! You're moving in the right direction. Try to increase your protein intake to help build more muscle mass while continuing your current cardio routine.";

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Your InBody Results</h1>
          <p className="text-fithabit-gray">Track your physical progress over time.</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Current Status</h2>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <Calendar className="w-4 h-4 mr-1" />
              Schedule Next Scan
            </Button>
          </div>
          <InBodyStats {...mockInBodyData} />
        </div>
        
        {/* AI Feedback */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Feedback</h2>
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
                <h3 className="font-medium mb-2">Analysis of Your Progress</h3>
                <p className="text-fithabit-gray">{mockFeedback}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <div className="bg-white rounded-xl overflow-hidden card-shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">Muscle Mass (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-fithabit-gray-dark uppercase tracking-wider">Body Fat (%)</th>
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
          <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
          <div className="bg-white rounded-xl p-6 card-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Weight Goal (kg)</label>
                <input 
                  type="number" 
                  defaultValue={mockInBodyData.weightGoal}
                  className="input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Muscle Mass Goal (kg)</label>
                <input 
                  type="number" 
                  defaultValue={mockInBodyData.muscleMassGoal}
                  className="input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body Fat Goal (%)</label>
                <input 
                  type="number" 
                  defaultValue={mockInBodyData.bodyFatGoal}
                  className="input-primary w-full"
                />
              </div>
            </div>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              Update Goals
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InBody;
