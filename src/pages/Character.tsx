import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { UserCharacter } from '@/components/Character/UserCharacter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Item {
  id: string;
  name: string;
  type: 'outfit' | 'accessory' | 'background' | 'expression';
  price: number;
  owned: boolean;
  equipped: boolean;
  preview: string;
}

const Character = () => {
  const [points, setPoints] = useState(200);
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Summer Outfit', type: 'outfit', price: 50, owned: true, equipped: false, preview: 'summer' },
    { id: '2', name: 'Workout Outfit', type: 'outfit', price: 80, owned: false, equipped: false, preview: 'workout' },
    { id: '3', name: 'Formal Outfit', type: 'outfit', price: 100, owned: false, equipped: false, preview: 'formal' },
    { id: '4', name: 'Hat', type: 'accessory', price: 30, owned: true, equipped: false, preview: 'hat' },
    { id: '5', name: 'Glasses', type: 'accessory', price: 40, owned: false, equipped: false, preview: 'glasses' },
    { id: '6', name: 'Beach', type: 'background', price: 60, owned: false, equipped: false, preview: 'beach' },
    { id: '7', name: 'Park', type: 'background', price: 60, owned: true, equipped: false, preview: 'park' },
    { id: '8', name: 'Happy', type: 'expression', price: 0, owned: true, equipped: true, preview: 'happy' },
    { id: '9', name: 'Neutral', type: 'expression', price: 0, owned: true, equipped: false, preview: 'neutral' },
    { id: '10', name: 'Sad', type: 'expression', price: 0, owned: true, equipped: false, preview: 'sad' },
  ]);
  
  const [activeTab, setActiveTab] = useState('outfits');
  
  const [preview, setPreview] = useState({
    outfit: undefined,
    accessories: [],
    background: undefined,
    expression: 'happy'
  });
  
  const buyItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || item.owned || points < item.price) return;
    
    setPoints(points - item.price);
    setItems(items.map(i => i.id === id ? { ...i, owned: true } : i));
  };
  
  const equipItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || !item.owned) return;
    
    if (item.type === 'outfit') {
      setItems(items.map(i => i.type === 'outfit' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
    } else if (item.type === 'accessory') {
      setItems(items.map(i => i.id === id 
        ? { ...i, equipped: !i.equipped } 
        : i
      ));
    } else if (item.type === 'background') {
      setItems(items.map(i => i.type === 'background' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
    } else if (item.type === 'expression') {
      setItems(items.map(i => i.type === 'expression' 
        ? { ...i, equipped: i.id === id } 
        : i
      ));
    }
  };
  
  const previewItem = (id: string | null) => {
    if (!id) {
      // Reset preview to equipped items
      const equippedOutfit = items.find(i => i.type === 'outfit' && i.equipped);
      const equippedAccessories = items.filter(i => i.type === 'accessory' && i.equipped);
      const equippedBackground = items.find(i => i.type === 'background' && i.equipped);
      const equippedExpression = items.find(i => i.type === 'expression' && i.equipped);
      
      setPreview({
        outfit: equippedOutfit?.preview,
        accessories: equippedAccessories.map(a => a.preview),
        background: equippedBackground?.preview,
        expression: (equippedExpression?.preview || 'happy') as 'happy' | 'sad' | 'neutral',
      });
      return;
    }
    
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    if (item.type === 'outfit') {
      setPreview({ ...preview, outfit: item.preview });
    } else if (item.type === 'accessory') {
      // Toggle the accessory in preview
      const accessories = [...preview.accessories];
      if (accessories.includes(item.preview)) {
        setPreview({ 
          ...preview, 
          accessories: accessories.filter(a => a !== item.preview) 
        });
      } else {
        setPreview({ ...preview, accessories: [...accessories, item.preview] });
      }
    } else if (item.type === 'background') {
      setPreview({ ...preview, background: item.preview });
    } else if (item.type === 'expression') {
      setPreview({ 
        ...preview, 
        expression: item.preview as 'happy' | 'sad' | 'neutral'
      });
    }
  };

  return (
    <Layout>
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Character Customization</h1>
          <p className="text-fithabit-gray">Personalize your fitness buddy with earned points.</p>
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
              />
              <div className="mt-6 w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Your Points</span>
                  <span className="font-bold text-fithabit-red">{points} pts</span>
                </div>
                <Button 
                  className="w-full bg-fithabit-red hover:bg-fithabit-red-dark text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
          
          {/* Item Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 card-shadow">
              <Tabs defaultValue="outfits" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="outfits">Outfits</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                  <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
                  <TabsTrigger value="expressions">Expressions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="outfits" className="space-y-4">
                  <h3 className="font-medium mb-4">Select an Outfit</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'outfit')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            {/* This would be the item image in production */}
                            <div className="bg-fithabit-gray-light rounded-full w-12 h-12 flex items-center justify-center">
                              👕
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={() => equipItem(item.id)}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? 'Equipped' : 'Equip'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => buyItem(item.id)}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                {/* Other tabs would follow the same pattern */}
                <TabsContent value="accessories" className="space-y-4">
                  <h3 className="font-medium mb-4">Choose Accessories</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'accessory')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className="bg-fithabit-gray-light rounded-full w-12 h-12 flex items-center justify-center">
                              🧢
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={() => equipItem(item.id)}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? 'Remove' : 'Equip'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => buyItem(item.id)}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="backgrounds" className="space-y-4">
                  <h3 className="font-medium mb-4">Choose Background</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items
                      .filter(item => item.type === 'background')
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`
                            border rounded-lg p-4 text-center cursor-pointer
                            ${item.equipped ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
                          `}
                          onMouseEnter={() => previewItem(item.id)}
                          onMouseLeave={() => previewItem(null)}
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className="bg-fithabit-gray-light rounded-full w-12 h-12 flex items-center justify-center">
                              🏖️
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              onClick={() => equipItem(item.id)}
                              className={`w-full text-xs ${
                                item.equipped 
                                  ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                  : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                              }`}
                            >
                              {item.equipped ? 'Equipped' : 'Equip'}
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => buyItem(item.id)}
                              disabled={points < item.price}
                              className="w-full text-xs"
                              variant="outline"
                            >
                              {item.price} pts
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="expressions" className="space-y-4">
                  <h3 className="font-medium mb-4">Choose Expression</h3>
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
                        >
                          <div className="h-20 flex items-center justify-center mb-2">
                            <div className="text-4xl">
                              {item.name === 'Happy' ? '😊' : item.name === 'Sad' ? '😔' : '😐'}
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-1">{item.name}</p>
                          <Button 
                            size="sm" 
                            onClick={() => equipItem(item.id)}
                            className={`w-full text-xs ${
                              item.equipped 
                                ? 'bg-fithabit-red hover:bg-fithabit-red-dark text-white' 
                                : 'bg-transparent border border-fithabit-red text-fithabit-red hover:bg-red-50'
                            }`}
                          >
                            {item.equipped ? 'Selected' : 'Select'}
                          </Button>
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

export default Character;
