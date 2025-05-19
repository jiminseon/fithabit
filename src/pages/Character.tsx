
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Item {
  id: string;
  name: string;
  type: 'outfit' | 'accessory' | 'background' | 'expression' | 'innerCircle';
  price: number;
  owned: boolean;
  equipped: boolean;
  preview: string;
  premium?: boolean;
}

const Character = () => {
  const [points, setPoints] = useLocalStorage('points', 200);
  const [items, setItems] = useLocalStorage<Item[]>('characterItems', [
    // Outfits
    { id: '1', name: '여름 옷', type: 'outfit', price: 50, owned: true, equipped: false, preview: 'summer' },
    { id: '2', name: '운동복', type: 'outfit', price: 80, owned: false, equipped: false, preview: 'workout' },
    { id: '3', name: '정장', type: 'outfit', price: 100, owned: false, equipped: false, preview: 'formal' },
    { id: '11', name: '디자이너 의상', type: 'outfit', price: 300, owned: false, equipped: false, preview: 'designer', premium: true },
    { id: '12', name: '우주복', type: 'outfit', price: 400, owned: false, equipped: false, preview: 'spacesuit', premium: true },
    { id: '13', name: '로얄 로브', type: 'outfit', price: 500, owned: false, equipped: false, preview: 'royal', premium: true },
    
    // Accessories
    { id: '4', name: '모자', type: 'accessory', price: 30, owned: true, equipped: false, preview: 'hat' },
    { id: '5', name: '안경', type: 'accessory', price: 40, owned: false, equipped: false, preview: 'glasses' },
    { id: '14', name: '스카프', type: 'accessory', price: 60, owned: false, equipped: false, preview: 'scarf' },
    { id: '15', name: '나비넥타이', type: 'accessory', price: 70, owned: false, equipped: false, preview: 'bowtie' },
    { id: '16', name: '왕관', type: 'accessory', price: 350, owned: false, equipped: false, preview: 'crown', premium: true },
    { id: '17', name: '날개', type: 'accessory', price: 450, owned: false, equipped: false, preview: 'wings', premium: true },
    
    // Backgrounds
    { id: '6', name: '해변', type: 'background', price: 60, owned: false, equipped: false, preview: 'beach' },
    { id: '7', name: '공원', type: 'background', price: 60, owned: true, equipped: false, preview: 'park' },
    { id: '18', name: '우주', type: 'background', price: 250, owned: false, equipped: false, preview: 'space', premium: true },
    { id: '19', name: '성', type: 'background', price: 300, owned: false, equipped: false, preview: 'castle', premium: true },
    { id: '20', name: '오로라', type: 'background', price: 350, owned: false, equipped: false, preview: 'aurora', premium: true },
    
    // Expressions
    { id: '8', name: '행복', type: 'expression', price: 0, owned: true, equipped: true, preview: 'happy' },
    { id: '9', name: '무표정', type: 'expression', price: 0, owned: true, equipped: false, preview: 'neutral' },
    { id: '10', name: '슬픔', type: 'expression', price: 0, owned: true, equipped: false, preview: 'sad' },
    
    // Inner Circle Colors
    { id: '21', name: '노란색', type: 'innerCircle', price: 20, owned: true, equipped: true, preview: 'bg-yellow-100' },
    { id: '22', name: '하늘색', type: 'innerCircle', price: 40, owned: false, equipped: false, preview: 'bg-sky-200' },
    { id: '23', name: '분홍색', type: 'innerCircle', price: 40, owned: false, equipped: false, preview: 'bg-pink-200' },
    { id: '24', name: '초록색', type: 'innerCircle', price: 40, owned: false, equipped: false, preview: 'bg-green-200' },
    { id: '25', name: '보라색', type: 'innerCircle', price: 40, owned: false, equipped: false, preview: 'bg-purple-200' },
    { id: '26', name: '골드', type: 'innerCircle', price: 200, owned: false, equipped: false, preview: 'bg-amber-300', premium: true },
    { id: '27', name: '실버', type: 'innerCircle', price: 180, owned: false, equipped: false, preview: 'bg-gray-300', premium: true },
  ]);
  
  const [activeTab, setActiveTab] = useState('outfits');
  
  const [preview, setPreview] = useLocalStorage('characterPreview', {
    outfit: undefined,
    accessories: [] as string[],
    background: undefined,
    expression: 'happy' as 'happy' | 'sad' | 'neutral',
    innerCircleColor: 'bg-yellow-100',
    premium: false
  });
  
  const buyItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || item.owned || points < item.price) return;
    
    setPoints(points - item.price);
    setItems(items.map(i => i.id === id ? { ...i, owned: true } : i));
    toast.success(`${item.name} 아이템을 구매했습니다!`);
  };
  
  const equipItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || !item.owned) return;
    
    if (item.type === 'outfit') {
      setItems(items.map(i => i.type === 'outfit' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
      toast.success(`${item.name}을(를) 장착했습니다!`);
    } else if (item.type === 'accessory') {
      setItems(items.map(i => i.id === id 
        ? { ...i, equipped: !i.equipped } 
        : i
      ));
      const actionMsg = !item.equipped ? '장착' : '제거';
      toast.success(`${item.name}을(를) ${actionMsg}했습니다!`);
    } else if (item.type === 'background') {
      setItems(items.map(i => i.type === 'background' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
      toast.success(`${item.name}을(를) 장착했습니다!`);
    } else if (item.type === 'expression') {
      setItems(items.map(i => i.type === 'expression' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
      toast.success(`${item.name} 표정을 선택했습니다!`);
    } else if (item.type === 'innerCircle') {
      setItems(items.map(i => i.type === 'innerCircle'
        ? { ...i, equipped: i.id === id }
        : i
      ));
      toast.success(`${item.name} 색상을 선택했습니다!`);
    }
  };
  
  const previewItem = (id: string | null) => {
    if (!id) {
      // Reset preview to equipped items
      const equippedOutfit = items.find(i => i.type === 'outfit' && i.equipped);
      const equippedAccessories = items.filter(i => i.type === 'accessory' && i.equipped);
      const equippedBackground = items.find(i => i.type === 'background' && i.equipped);
      const equippedExpression = items.find(i => i.type === 'expression' && i.equipped);
      const equippedInnerCircle = items.find(i => i.type === 'innerCircle' && i.equipped);
      
      // Check if any equipped items are premium
      const hasPremium = 
        (equippedOutfit?.premium === true) || 
        (equippedBackground?.premium === true) || 
        equippedAccessories.some(a => items.find(i => i.id === a.id)?.premium === true) ||
        (equippedInnerCircle?.premium === true);
      
      setPreview({
        outfit: equippedOutfit?.preview,
        accessories: equippedAccessories.map(a => a.preview),
        background: equippedBackground?.preview,
        expression: (equippedExpression?.preview as 'happy' | 'sad' | 'neutral') || 'happy',
        innerCircleColor: equippedInnerCircle?.preview || 'bg-yellow-100',
        premium: hasPremium
      });
      return;
    }
    
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    if (item.type === 'outfit') {
      setPreview({ ...preview, outfit: item.preview, premium: item.premium || preview.premium });
    } else if (item.type === 'accessory') {
      // Toggle the accessory in preview
      const accessories = [...preview.accessories];
      if (accessories.includes(item.preview)) {
        setPreview({ 
          ...preview, 
          accessories: accessories.filter(a => a !== item.preview),
          premium: preview.premium && !item.premium ? false : preview.premium
        });
      } else {
        setPreview({ 
          ...preview, 
          accessories: [...accessories, item.preview],
          premium: item.premium || preview.premium
        });
      }
    } else if (item.type === 'background') {
      setPreview({ ...preview, background: item.preview, premium: item.premium || preview.premium });
    } else if (item.type === 'expression') {
      setPreview({ 
        ...preview, 
        expression: item.preview as 'happy' | 'sad' | 'neutral' 
      });
    } else if (item.type === 'innerCircle') {
      setPreview({
        ...preview,
        innerCircleColor: item.preview,
        premium: item.premium || preview.premium
      });
    }
  };
  
  const saveChanges = () => {
    const equippedOutfit = items.find(i => i.type === 'outfit' && i.equipped);
    const equippedAccessories = items.filter(i => i.type === 'accessory' && i.equipped);
    const equippedBackground = items.find(i => i.type === 'background' && i.equipped);
    const equippedExpression = items.find(i => i.type === 'expression' && i.equipped);
    const equippedInnerCircle = items.find(i => i.type === 'innerCircle' && i.equipped);
    
    // Check if any equipped items are premium
    const hasPremium = 
      (equippedOutfit?.premium === true) || 
      (equippedBackground?.premium === true) || 
      equippedAccessories.some(a => a.premium === true) ||
      (equippedInnerCircle?.premium === true);
    
    // Update the preview state with equipped items
    setPreview({
      outfit: equippedOutfit?.preview,
      accessories: equippedAccessories.map(a => a.preview),
      background: equippedBackground?.preview,
      expression: (equippedExpression?.preview as 'happy' | 'sad' | 'neutral') || 'happy',
      innerCircleColor: equippedInnerCircle?.preview || 'bg-yellow-100',
      premium: hasPremium
    });
    
    toast.success("변경사항이 저장되었습니다!");
  };

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">캐릭터 커스터마이징</h1>
          <p className="text-fithabit-gray">획득한 포인트로 피트니스 친구를 커스터마이징하세요.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Character Preview */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 card-shadow flex flex-col items-center">
              <UserCharacter 
                size="lg" 
                outfit={preview.outfit} 
                accessories={preview.accessories}
                background={preview.background}
                expression={preview.expression}
                innerCircleColor={preview.innerCircleColor}
                premium={preview.premium}
              />
              <div className="mt-6 w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">보유 포인트</span>
                  <span className="font-bold text-fithabit-red">{points} pts</span>
                </div>
                <Button 
                  className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white"
                  onClick={saveChanges}
                >
                  변경사항 저장
                </Button>
              </div>
            </div>
          </div>
          
          {/* Item Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <Tabs defaultValue="outfits" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="outfits">옷</TabsTrigger>
                  <TabsTrigger value="accessories">액세서리</TabsTrigger>
                  <TabsTrigger value="backgrounds">배경</TabsTrigger>
                  <TabsTrigger value="expressions">표정</TabsTrigger>
                  <TabsTrigger value="innerCircle">내부 색상</TabsTrigger>
                </TabsList>
                
                <TabsContent value="outfits" className="space-y-4">
                  <h3 className="font-medium mb-4">옷 선택</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'outfit')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                            ${item.premium ? 'border-amber-400 shadow-amber-200 shadow-inner' : ''}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                          onClick={() => item.owned ? equipItem(item.id) : buyItem(item.id)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            {/* Preview of outfit */}
                            <div className={`rounded-full w-12 h-12 flex items-center justify-center ${outfitStyles[item.preview]?.color || 'bg-fithabit-gray-light'} ${item.premium ? 'animate-pulse' : ''}`}>
                              {item.premium && (
                                <span className="absolute top-0 right-0 text-amber-500">✨</span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                equipItem(item.id);
                              }}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? '장착됨' : '장착하기'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                buyItem(item.id);
                              }}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.premium && '✨'} {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="accessories" className="space-y-4">
                  <h3 className="font-medium mb-4">액세서리 선택</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'accessory')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                            ${item.premium ? 'border-amber-400 shadow-amber-200 shadow-inner' : ''}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                          onClick={() => item.owned ? equipItem(item.id) : buyItem(item.id)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className="bg-fithabit-gray-light rounded-full w-12 h-12 flex items-center justify-center relative">
                              {item.preview === 'hat' && <div className="bg-red-400 w-8 h-4 rounded-t-full absolute -top-2"></div>}
                              {item.preview === 'glasses' && <div className="bg-gray-800 w-8 h-1.5 rounded absolute"></div>}
                              {item.preview === 'scarf' && <div className="bg-red-300 w-10 h-2.5 rounded absolute -bottom-2"></div>}
                              {item.preview === 'bowtie' && <div className="bg-pink-500 w-6 h-3 absolute bottom-1"></div>}
                              {item.preview === 'crown' && <div className="bg-yellow-400 w-6 h-4 rounded-t-lg absolute -top-3 flex items-center justify-center"><span className="text-yellow-600 text-[8px]">♦</span></div>}
                              {item.preview === 'wings' && <div className="bg-white w-8 h-6 rounded-full absolute -left-6 flex items-center justify-center"><span className="text-[8px]">★</span></div>}
                              
                              {item.premium && (
                                <span className="absolute top-0 right-0 text-amber-500">✨</span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                equipItem(item.id);
                              }}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? '제거' : '장착하기'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                buyItem(item.id);
                              }}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.premium && '✨'} {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="backgrounds" className="space-y-4">
                  <h3 className="font-medium mb-4">배경 선택</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'background')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                            ${item.premium ? 'border-amber-400 shadow-amber-200 shadow-inner' : ''}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                          onClick={() => item.owned ? equipItem(item.id) : buyItem(item.id)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className={`rounded-full w-12 h-12 flex items-center justify-center ${
                              getBgColor(item.preview)
                            } ${item.premium ? 'animate-pulse' : ''}`}>
                              {item.premium && (
                                <span className="text-amber-500">✨</span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                equipItem(item.id);
                              }}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? '장착됨' : '장착하기'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                buyItem(item.id);
                              }}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.premium && '✨'} {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="expressions" className="space-y-4">
                  <h3 className="font-medium mb-4">표정 선택</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'expression')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                          onClick={() => equipItem(item.id)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center relative">
                              {/* Eyes */}
                              <div className="absolute flex w-full justify-center space-x-2" style={{ top: '40%' }}>
                                <div className="bg-fithabit-red rounded-full w-1.5 h-1.5"></div>
                                <div className="bg-fithabit-red rounded-full w-1.5 h-1.5"></div>
                              </div>
                              
                              {/* Mouth */}
                              <div className="absolute" style={{ top: '60%' }}>
                                {item.preview === 'happy' && <div className="border-b-2 border-fithabit-red w-4 h-2 rounded-b-full"></div>}
                                {item.preview === 'sad' && <div className="border-t-2 border-fithabit-red w-4 h-2 rounded-t-full"></div>}
                                {item.preview === 'neutral' && <div className="border-t-0 border-b-2 border-fithabit-red w-4 h-0.5"></div>}
                              </div>
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              equipItem(item.id);
                            }}
                            className={`w-full text-xs ${
                              item.equipped 
                                ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                            }`}
                          >
                            {item.equipped ? '선택됨' : '선택'}
                          </Button>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="innerCircle" className="space-y-4">
                  <h3 className="font-medium mb-4">내부 색상 선택</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'innerCircle')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                            ${item.premium ? 'border-amber-400 shadow-amber-200 shadow-inner' : ''}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                          onClick={() => item.owned ? equipItem(item.id) : buyItem(item.id)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className={`${item.preview} rounded-full w-12 h-12 flex items-center justify-center relative ${item.premium ? 'animate-pulse' : ''}`}>
                              {item.premium && (
                                <span className="text-amber-600">✨</span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                equipItem(item.id);
                              }}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? '선택됨' : '선택'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                buyItem(item.id);
                              }}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.premium && '✨'} {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Style definitions for the character items
const outfitStyles: Record<string, { color: string }> = {
  default: { color: 'bg-transparent' },
  summer: { color: 'bg-blue-300' },
  workout: { color: 'bg-gray-300' },
  formal: { color: 'bg-gray-700' },
  designer: { color: 'bg-purple-400' },
  spacesuit: { color: 'bg-blue-600' },
  royal: { color: 'bg-red-600' }
};

// Helper function for background colors
const getBgColor = (preview: string) => {
  switch(preview) {
    case 'beach': return 'bg-blue-200';
    case 'park': return 'bg-green-200';
    case 'space': return 'bg-blue-900';
    case 'castle': return 'bg-amber-200';
    case 'aurora': return 'bg-purple-300';
    default: return 'bg-fithabit-gray-light';
  }
};

export default Character;
