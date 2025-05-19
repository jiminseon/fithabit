
import { Progress } from '@/components/ui/progress';

interface InBodyStatsProps {
  weight: number;
  weightGoal: number;
  muscleMass: number;
  muscleMassGoal: number;
  bodyFat: number;
  bodyFatGoal: number;
  lastUpdated: string;
  nextScheduled: string;
}

export const InBodyStats = ({
  weight,
  weightGoal,
  muscleMass,
  muscleMassGoal,
  bodyFat,
  bodyFatGoal,
  lastUpdated,
  nextScheduled,
}: InBodyStatsProps) => {
  // Calculate progress percentages
  const calculateProgress = (current: number, goal: number, isReverse: boolean = false) => {
    // For metrics like body fat where lower is better, we use isReverse
    if (isReverse) {
      // If current is higher than goal, calculate how close to goal (max 100%)
      if (current > goal) {
        const max = goal * 1.5; // Set a reasonable max (50% over goal)
        return 100 - Math.min(100, ((current - goal) / (max - goal)) * 100);
      }
      // If current is already better than goal, show 100%
      return 100;
    } else {
      // For metrics like muscle mass where higher is better
      return Math.min(100, (current / goal) * 100);
    }
  };

  const weightProgress = calculateProgress(weight, weightGoal, weight > weightGoal);
  const muscleProgress = calculateProgress(muscleMass, muscleMassGoal);
  const fatProgress = calculateProgress(bodyFat, bodyFatGoal, true);

  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">인바디 결과</h3>
        <div className="text-xs text-fithabit-gray">최근 업데이트: {lastUpdated}</div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-fithabit-gray-dark font-medium">체중</span>
            <span className="text-fithabit-gray">{weight} kg / {weightGoal} kg 목표</span>
          </div>
          <Progress value={weightProgress} className="h-2 bg-fithabit-gray-light" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-fithabit-gray-dark font-medium">근육량</span>
            <span className="text-fithabit-gray">{muscleMass} kg / {muscleMassGoal} kg 목표</span>
          </div>
          <Progress value={muscleProgress} className="h-2 bg-fithabit-gray-light" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-fithabit-gray-dark font-medium">체지방</span>
            <span className="text-fithabit-gray">{bodyFat}% / {bodyFatGoal}% 목표</span>
          </div>
          <Progress value={fatProgress} className="h-2 bg-fithabit-gray-light" />
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-fithabit-gray-light">
        <p className="text-sm text-fithabit-gray">
          <span className="font-medium text-fithabit-red">다음 인바디:</span> {nextScheduled}
        </p>
      </div>
    </div>
  );
};
