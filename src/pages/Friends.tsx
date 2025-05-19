
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { Button } from '@/components/ui/button';
import { Check, Plus, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

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
      name: '김서연',
      status: 'success',
      successCount: 12,
      failCount: 3,
      points: 120,
      stealPoints: 10,
      goalName: '5kg 감량',
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
      name: '이민준',
      status: 'fail',
      successCount: 8,
      failCount: 7,
      points: 80,
      stealPoints: 15,
      goalName: '매일 5km 달리기',
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
      name: '황지우',
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
    toast.success("운동 완료 확인!");
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
      goalName: '새 목표',
      goalProgress: 0,
      needsConfirmation: false,
      character: {
        expression: 'neutral',
      },
    };
    
    // Add to friends and remove from requests
    setFriends([...friends, newFriend]);
    setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    toast.success(`${request.name}님의 친구 요청을 수락했습니다!`);
  };
  
  const deleteFriend = (friendId: string) => {
    const friend = friends.find(f => f.id === friendId);
    if (!friend) return;
    
    setFriends(friends.filter(f => f.id !== friendId));
    toast.success(`${friend.name}님을 친구 목록에서 삭제했습니다.`);
  };

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">내 친구</h1>
          <p className="text-fithabit-gray">함께 동기부여하고 서로 책임감을 갖도록 도와주세요.</p>
        </div>
        
        {/* Friend Requests */}
        {friendRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">친구 요청</h2>
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
                      수락
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-fithabit-gray text-fithabit-gray"
                    >
                      거절
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
            <h2 className="text-xl font-semibold">내 친구 목록</h2>
            <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
              <Plus size={16} className="mr-1" />
              친구 추가
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
                          <p className="text-sm text-fithabit-gray">상태</p>
                          <p className={`font-medium ${
                            friend.status === 'success' ? 'text-green-600' : 
                            friend.status === 'fail' ? 'text-red-600' : 'text-fithabit-gray'
                          }`}>
                            {friend.status === 'success' ? '완료' : 
                             friend.status === 'fail' ? '실패' : '미기록'}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-fithabit-gray">기록</p>
                          <p className="font-medium">
                            <span className="text-green-600">{friend.successCount}</span> / 
                            <span className="text-red-600">{friend.failCount}</span>
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-fithabit-gray">포인트</p>
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
                      
                      <div className="flex justify-between">
                        {friend.needsConfirmation ? (
                          <div className="bg-red-50 border border-fithabit-red p-3 rounded-lg flex justify-between items-center flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{friend.name}</span>님이 오늘의 운동 성공을 기록했습니다.
                            </p>
                            <Button 
                              size="sm"
                              onClick={() => confirmWorkout(friend.id)}
                              className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
                            >
                              <Check size={14} className="mr-1" />
                              확인
                            </Button>
                          </div>
                        ) : <div></div>}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm"
                              variant="outline"
                              className="border-red-400 text-red-500 hover:bg-red-50 ml-2"
                            >
                              <Trash size={14} className="mr-1" />
                              삭제
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>정말로 친구를 삭제하시겠습니까?</AlertDialogTitle>
                              <AlertDialogDescription>
                                {friend.name}님을 친구 목록에서 삭제합니다. 이 작업은 되돌릴 수 없습니다.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteFriend(friend.id)}
                                className="bg-red-500 text-white hover:bg-red-600"
                              >
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl card-shadow">
              <p className="text-fithabit-gray mb-4">아직 친구를 추가하지 않았습니다.</p>
              <Button className="bg-fithabit-red hover:bg-fithabit-red-dark text-white">
                <Plus size={16} className="mr-1" />
                친구 찾기
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Friends;
