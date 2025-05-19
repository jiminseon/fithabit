
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { WorkoutStatus } from '@/components/Workout/WorkoutStatus';
import { InBodyStats } from '@/components/InBody/InBodyStats';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkoutTask {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

const Home = () => {
  const [workoutStatus, setWorkoutStatus] = useState<'success' | 'fail' | null>(null);
  const [workoutTasks, setWorkoutTasks] = useState<WorkoutTask[]>([
    { 
      id: '1', 
      name: '30분 달리기', 
      description: '편안한 페이스로 30분간 달리기', 
      completed: false 
    },
    { 
      id: '2', 
      name: '스쿼트 50개', 
      description: '올바른 자세로 스쿼트 50개 수행', 
      completed: false 
    },
    { 
      id: '3', 
      name: '플랭크 3분', 
      description: '3세트, 각 1분씩 플랭크 자세 유지', 
      completed: false 
    }
  ]);

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
  
  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setWorkoutTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  // Check if all tasks are completed
  const allTasksCompleted = workoutTasks.every(task => task.completed);

  // Effect to set workout status when all tasks are completed
  useEffect(() => {
    if (allTasksCompleted && workoutStatus !== 'success') {
      setWorkoutStatus('success');
    }
  }, [allTasksCompleted, workoutTasks, workoutStatus]);

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">안녕하세요!</h1>
          <p className="text-fithabit-gray">오늘도 건강한 습관을 만들어 봅시다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Character display */}
          <div className="bg-white rounded-xl p-6 card-shadow flex flex-col items-center justify-center">
            <UserCharacter size="lg" expression={workoutStatus === 'success' ? 'happy' : workoutStatus === 'fail' ? 'sad' : 'neutral'} />
            <p className="mt-4 text-lg font-medium">
              {workoutStatus === 'success' 
                ? "정말 자랑스러워요!" 
                : workoutStatus === 'fail' 
                ? "괜찮아요, 내일 다시 시도해요." 
                : "오늘의 운동 준비됐나요?"}
            </p>
            <Link to="/character" className="mt-3 text-sm text-fithabit-red hover:underline">
              캐릭터 커스터마이징
            </Link>
          </div>

          {/* Workout status */}
          <WorkoutStatus onStatusChange={setWorkoutStatus} />
        </div>
        
        {/* Today's Workout Tasks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">오늘의 운동</h2>
          </div>
          <div className="bg-white rounded-xl p-6 card-shadow">
            <ul className="space-y-3">
              {workoutTasks.map(task => (
                <li key={task.id} className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-5 h-5 rounded border-fithabit-gray text-fithabit-red focus:ring-fithabit-red"
                  />
                  <label htmlFor={`task-${task.id}`} className={`flex-1 ${task.completed ? 'line-through text-fithabit-gray' : ''}`}>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-sm text-fithabit-gray">{task.description}</div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inbody summary */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">내 진행 상황</h2>
            <Link to="/inbody" className="text-fithabit-red hover:underline flex items-center text-sm">
              자세히 보기 <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <InBodyStats {...mockInBodyData} />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/friends" className="bg-white rounded-xl p-6 card-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">친구 활동</h3>
              <p className="text-sm text-fithabit-gray">친구들의 진행 상황 확인하기</p>
            </div>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/app-restriction" className="bg-white rounded-xl p-6 card-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">앱 제한</h3>
              <p className="text-sm text-fithabit-gray">디지털 방해 요소 관리하기</p>
            </div>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
