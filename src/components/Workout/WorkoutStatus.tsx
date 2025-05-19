
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WorkoutStatusProps {
  onStatusChange?: (status: 'success' | 'fail' | null) => void;
}

export const WorkoutStatus = ({ onStatusChange }: WorkoutStatusProps) => {
  const [status, setStatus] = useState<'success' | 'fail' | null>(null);
  const [showMission, setShowMission] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  
  // Sample mini missions
  const miniMissions = [
    '점핑 잭 20회',
    '팔굽혀펴기 10회',
    '30초 플랭크',
    '스쿼트 15회',
    '다리당 런지 10회'
  ];
  
  const [currentMission, setCurrentMission] = useState('');
  
  const markSuccess = () => {
    setStatus('success');
    setShowMission(false);
    if (onStatusChange) onStatusChange('success');
    toast.success("잘했습니다! 오늘의 운동을 완료했어요!");
  };
  
  const markFail = () => {
    setStatus('fail');
    // Select random mini mission
    const randomMission = miniMissions[Math.floor(Math.random() * miniMissions.length)];
    setCurrentMission(randomMission);
    setShowMission(true);
    setMissionCompleted(false);
    if (onStatusChange) onStatusChange('fail');
    toast.error("괜찮아요! 미니 미션을 완료하고 회복하세요!");
  };
  
  const completeMission = () => {
    setMissionCompleted(true);
    toast.success("미니 미션 완료! 다시 정상 궤도에 올랐습니다!");
  };

  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <h3 className="text-xl font-semibold mb-4">오늘의 운동</h3>
      
      {status === null ? (
        <div>
          <p className="text-fithabit-gray mb-4">
            오늘의 운동을 완료하셨나요?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={markSuccess}
              className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
            >
              성공
            </Button>
            <Button 
              onClick={markFail}
              variant="outline" 
              className="border-fithabit-gray text-fithabit-gray"
            >
              실패
            </Button>
          </div>
        </div>
      ) : status === 'success' ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-semibold mb-2">운동 완료! 🎉</p>
          <p className="text-fithabit-gray text-sm">
            좋은 습관을 만들어가고 있어요. 계속 유지하세요!
          </p>
        </div>
      ) : showMission ? (
        <div className="border-2 border-fithabit-red rounded-lg p-4 animate-pulse-gentle">
          <p className="font-medium mb-3">미니 미션:</p>
          <p className="text-xl font-bold mb-4">{currentMission}</p>
          
          {!missionCompleted ? (
            <Button 
              onClick={completeMission}
              className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white"
            >
              완료했어요!
            </Button>
          ) : (
            <p className="text-green-600 font-semibold">
              좋은 노력이에요! 자신을 되찾았네요. 💪
            </p>
          )}
        </div>
      ) : (
        <p className="text-fithabit-gray">
          운동 상태: <span className="text-red-500 font-medium">실패</span>
        </p>
      )}
    </div>
  );
};
