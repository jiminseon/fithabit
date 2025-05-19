
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
    '20 jumping jacks',
    '10 push-ups',
    '30-second plank',
    '15 squats',
    '10 lunges per leg'
  ];
  
  const [currentMission, setCurrentMission] = useState('');
  
  const markSuccess = () => {
    setStatus('success');
    setShowMission(false);
    if (onStatusChange) onStatusChange('success');
    toast.success("Great job! You've completed your workout for today!");
  };
  
  const markFail = () => {
    setStatus('fail');
    // Select random mini mission
    const randomMission = miniMissions[Math.floor(Math.random() * miniMissions.length)];
    setCurrentMission(randomMission);
    setShowMission(true);
    setMissionCompleted(false);
    if (onStatusChange) onStatusChange('fail');
    toast.error("Don't worry, complete your mini mission to recover!");
  };
  
  const completeMission = () => {
    setMissionCompleted(true);
    toast.success("Mini mission completed! You're back on track!");
  };

  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <h3 className="text-xl font-semibold mb-4">Today's Workout</h3>
      
      {status === null ? (
        <div>
          <p className="text-fithabit-gray mb-4">
            Did you complete your workout today?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={markSuccess}
              className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
            >
              Success
            </Button>
            <Button 
              onClick={markFail}
              variant="outline" 
              className="border-fithabit-gray text-fithabit-gray"
            >
              Fail
            </Button>
          </div>
        </div>
      ) : status === 'success' ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-semibold mb-2">Workout Completed! 🎉</p>
          <p className="text-fithabit-gray text-sm">
            You're building great habits. Keep it up!
          </p>
        </div>
      ) : showMission ? (
        <div className="border-2 border-fithabit-red rounded-lg p-4 animate-pulse-gentle">
          <p className="font-medium mb-3">Mini Mission:</p>
          <p className="text-xl font-bold mb-4">{currentMission}</p>
          
          {!missionCompleted ? (
            <Button 
              onClick={completeMission}
              className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white"
            >
              I've Completed This!
            </Button>
          ) : (
            <p className="text-green-600 font-semibold">
              Great effort! You've redeemed yourself. 💪
            </p>
          )}
        </div>
      ) : (
        <p className="text-fithabit-gray">
          Workout status: <span className="text-red-500 font-medium">Failed</span>
        </p>
      )}
    </div>
  );
};
