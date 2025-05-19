
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { WorkoutStatus } from '@/components/Workout/WorkoutStatus';
import { InBodyStats } from '@/components/InBody/InBodyStats';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [workoutStatus, setWorkoutStatus] = useState<'success' | 'fail' | null>(null);

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

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-fithabit-gray">Let's continue building your healthy habits today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Character display */}
          <div className="bg-white rounded-xl p-6 card-shadow flex flex-col items-center justify-center">
            <UserCharacter size="lg" expression={workoutStatus === 'success' ? 'happy' : workoutStatus === 'fail' ? 'sad' : 'neutral'} />
            <p className="mt-4 text-lg font-medium">
              {workoutStatus === 'success' 
                ? "I'm so proud of you!" 
                : workoutStatus === 'fail' 
                ? "Don't worry, we all have off days." 
                : "Ready for today's workout?"}
            </p>
            <Link to="/character" className="mt-3 text-sm text-fithabit-red hover:underline">
              Customize Character
            </Link>
          </div>

          {/* Workout status */}
          <WorkoutStatus onStatusChange={setWorkoutStatus} />
        </div>

        {/* Inbody summary */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Progress</h2>
            <Link to="/inbody" className="text-fithabit-red hover:underline flex items-center text-sm">
              View Details <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <InBodyStats {...mockInBodyData} />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/friends" className="bg-white rounded-xl p-6 card-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">Friends Activity</h3>
              <p className="text-sm text-fithabit-gray">Check on your friends' progress</p>
            </div>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/app-restriction" className="bg-white rounded-xl p-6 card-shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">App Restrictions</h3>
              <p className="text-sm text-fithabit-gray">Manage your digital distractions</p>
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
