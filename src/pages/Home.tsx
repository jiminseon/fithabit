
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { InBodyStats } from '@/components/InBody/InBodyStats';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
  const [showMission, setShowMission] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [currentMission, setCurrentMission] = useState('');

  // Sample mini missions
  const miniMissions = [
    '점핑 잭 20회',
    '팔굽혀펴기 10회',
    '30초 플랭크',
    '스쿼트 15회',
    '다리당 런지 10회'
  ];
  
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

  // Check if all tasks are completed
  const allTasksCompleted = workoutTasks.every(task => task.completed);

  // Effect to set workout status when all tasks are completed
  useEffect(() => {
    if (allTasksCompleted && workoutStatus !== 'success') {
      setWorkoutStatus('success');
    }
  }, [allTasksCompleted, workoutTasks, workoutStatus]);

  // Functions to handle workout status
  const markSuccess = () => {
    setStatus('success');
    setShowMission(false);
    toast.success("잘했습니다! 오늘의 운동을 완료했어요!");
  };
  
  const markFail = () => {
    setStatus('fail');
    // Select random mini mission
    const randomMission = miniMissions[Math.floor(Math.random() * miniMissions.length)];
    setCurrentMission(randomMission);
    setShowMission(true);
    setMissionCompleted(false);
    toast.error("괜찮아요! 미니 미션을 완료하고 회복하세요!");
  };
  
  const completeMission = () => {
    setMissionCompleted(true);
    toast.success("미니 미션 완료! 다시 정상 궤도에 올랐습니다!");
  };

  const setStatus = (status: 'success' | 'fail' | null) => {
    setWorkoutStatus(status);
    
    // Save to localStorage
    localStorage.setItem('workoutStatus', status || '');
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('workoutStatus');
    if (savedStatus) {
      setWorkoutStatus(savedStatus as 'success' | 'fail' | null);
    }
    
    const savedTasks = localStorage.getItem('workoutTasks');
    if (savedTasks) {
      setWorkoutTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('workoutTasks', JSON.stringify(workoutTasks));
  }, [workoutTasks]);

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">안녕하세요!</h1>
          <p className="text-fithabit-gray">오늘도 건강한 습관을 만들어 봅시다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Combined Character & Workout display */}
          <div className="bg-white rounded-xl p-6 card-shadow">
            <div className="flex flex-col items-center justify-center mb-6">
              <UserCharacter size="lg" expression={workoutStatus === 'success' ? 'happy' : workoutStatus === 'fail' ? 'sad' : 'neutral'} />
              <p className="mt-4 text-lg font-medium">
                {workoutStatus === 'success' 
                  ? "정말 자랑스러워요!" 
                  : workoutStatus === 'fail' 
                  ? "괜찮아요, 내일 다시 시도해요." 
                  : "오늘의 운동 준비됐나요?"}
              </p>
              <Link to="/character" className="mt-1 text-sm text-fithabit-red hover:underline">
                캐릭터 커스터마이징
              </Link>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">오늘의 운동</h3>
            
            {showMission ? (
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
              <>
                <ul className="space-y-3 mb-6">
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
                
                {workoutStatus === null && (
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
                )}
                
                {workoutStatus === 'success' && (
                  <div className="text-center py-2">
                    <p className="text-green-600 font-semibold">운동 완료! 🎉</p>
                    <p className="text-fithabit-gray text-sm">
                      좋은 습관을 만들어가고 있어요. 계속 유지하세요!
                    </p>
                  </div>
                )}
                
                {workoutStatus === 'fail' && !showMission && (
                  <p className="text-fithabit-gray">
                    운동 상태: <span className="text-red-500 font-medium">실패</span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Inbody summary */}
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
