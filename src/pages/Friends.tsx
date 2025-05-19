
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  status: 'success' | 'fail' | null;
  successCount: number;
  failCount: number;
  points: number;
  stealPoints: number;
  goalName: string;
  goalProgress: number;
  needsConfirmation: boolean;
  character: {
    outfit?: string;
    accessories?: string[];
    expression: 'happy' | 'sad' | 'neutral';
  };
}

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Kim',
      status: 'success',
      successCount: 12,
      failCount: 3,
      points: 120,
      stealPoints: 10,
      goalName: 'Lose 5kg',
      goalProgress: 60,
      needsConfirmation: true,
      character: {
        outfit: 'summer',
        accessories: ['hat'],
        expression: 'happy',
      },
    },
    {
      id: '2',
      name: 'Mike Johnson',
      status: 'fail',
      successCount: 8,
      failCount: 7,
      points: 80,
      stealPoints: 15,
      goalName: 'Run 5km daily',
      goalProgress: 40,
      needsConfirmation: false,
      character: {
        expression: 'sad',
      },
    },
  ]);
  
  const [friendRequests, setFriendRequests] = useState([
    {
      id: '3',
      name: 'Emma Wilson',
    },
  ]);
  
  const confirmWorkout = (friendId: string) => {
    setFriends(friends.map(friend => {
      if (friend.id === friendId) {
        return {
          ...friend,
          needsConfirmation: false,
        };
      }
      return friend;
    }));
  };
  
  const acceptFriendRequest = (requestId: string) => {
    // Find the request
    const request = friendRequests.find(r => r.id === requestId);
    if (!request) return;
    
    // Create a new friend from the request
    const newFriend: Friend = {
      id: request.id,
      name: request.name,
      status: null,
      successCount: 0,
      failCount: 0,
      points: 0,
      stealPoints: 5,
      goalName: 'New Goal',
      goalProgress: 0,
      needsConfirmation: false,
      character: {
        expression: 'neutral',
      },
    };
    
    // Add to friends and remove from requests
    setFriends([...friends, newFriend]);
    setFriendRequests(friendRequests.filter(r => r.id !== requestId));
  };

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Friends</h1>
          <p className="text-fithabit-gray">Stay motivated together and keep each other accountable.</p>
        </div>
        
        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
            <div className="space-y-3">
              {friendRequests.map(request => (
                <div key={request.id} className="bg-white rounded-xl p-4 card-shadow flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-fithabit-gray-light flex items-center justify-center mr-3">
                      {request.name.charAt(0)}
                    </div>
                    <p className="font-medium">{request.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => acceptFriendRequest(request.id)}
                      className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-fithabit-gray text-fithabit-gray"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Friend List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Connections</h2>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <Plus size={16} className="mr-1" />
              Add Friend
            </Button>
          </div>
          
          {friends.length > 0 ? (
            <div className="space-y-6">
              {friends.map(friend => (
                <div key={friend.id} className="bg-white rounded-xl p-6 card-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <UserCharacter 
                        size="md" 
                        expression={friend.character.expression}
                        outfit={friend.character.outfit}
                        accessories={friend.character.accessories}
                      />
                      <h3 className="font-semibold mt-2">{friend.name}</h3>
                    </div>
                    
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-fithabit-gray">Status</p>
                          <p className={`font-medium ${
                            friend.status === 'success' ? 'text-green-600' : 
                            friend.status === 'fail' ? 'text-red-600' : 'text-fithabit-gray'
                          }`}>
                            {friend.status === 'success' ? 'Completed' : 
                             friend.status === 'fail' ? 'Failed' : 'Not Logged'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-fithabit-gray">Record</p>
                          <p className="font-medium">
                            <span className="text-green-600">{friend.successCount}</span> / 
                            <span className="text-red-600">{friend.failCount}</span>
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-fithabit-gray">Points</p>
                          <p className="font-medium">{friend.points} pts</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <p className="text-sm font-medium">{friend.goalName}</p>
                          <p className="text-sm text-fithabit-gray">{friend.goalProgress}%</p>
                        </div>
                        <div className="h-2 bg-fithabit-gray-light rounded overflow-hidden">
                          <div 
                            className="h-full bg-fithabit-red" 
                            style={{ width: `${friend.goalProgress}%` }}
                          />
                        </div>
                      </div>
                      
                      {friend.needsConfirmation && (
                        <div className="bg-red-50 border border-fithabit-red p-3 rounded-lg flex justify-between items-center">
                          <p className="text-sm">
                            <span className="font-medium">{friend.name}</span> logged a workout success today.
                          </p>
                          <Button 
                            size="sm"
                            onClick={() => confirmWorkout(friend.id)}
                            className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
                          >
                            <Check size={14} className="mr-1" />
                            Confirm
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl card-shadow">
              <p className="text-fithabit-gray mb-4">You haven't added any friends yet.</p>
              <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
                <Plus size={16} className="mr-1" />
                Find Friends
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Friends;
