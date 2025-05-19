
import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface App {
  id: string;
  name: string;
  icon: string;
  restricted: boolean;
  restrictedTime?: {
    from: string;
    to: string;
  };
}

export const AppList = () => {
  const [apps, setApps] = useState<App[]>([
    { id: '1', name: 'Instagram', icon: '📱', restricted: true, restrictedTime: { from: '22:00', to: '07:00' } },
    { id: '2', name: 'YouTube', icon: '📺', restricted: true, restrictedTime: { from: '22:00', to: '07:00' } },
    { id: '3', name: 'TikTok', icon: '🎵', restricted: false },
    { id: '4', name: 'Twitter', icon: '🐦', restricted: false },
    { id: '5', name: 'Facebook', icon: '👤', restricted: false },
    { id: '6', name: 'Netflix', icon: '🎬', restricted: false },
  ]);
  
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [restrictionTime, setRestrictionTime] = useState({
    from: '22:00',
    to: '07:00',
  });
  
  const toggleAppSelection = (appId: string) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
    }
  };
  
  const applyRestrictions = () => {
    setApps(apps.map(app => {
      if (selectedApps.includes(app.id)) {
        return {
          ...app,
          restricted: true,
          restrictedTime: restrictionTime,
        };
      }
      return app;
    }));
    setSelectedApps([]);
  };
  
  const removeRestriction = (appId: string) => {
    setApps(apps.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          restricted: false,
          restrictedTime: undefined,
        };
      }
      return app;
    }));
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">App Restrictions</h3>
        
        <div className="flex flex-wrap gap-4 mb-4">
          {apps.map(app => (
            <div 
              key={app.id} 
              className={`
                flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer
                ${selectedApps.includes(app.id) ? 'border-fithabit-red bg-red-50' : 'border-fithabit-gray-light'}
              `}
              onClick={() => toggleAppSelection(app.id)}
            >
              <span>{app.icon}</span>
              <span>{app.name}</span>
              {selectedApps.includes(app.id) && <Check size={16} className="text-fithabit-red" />}
            </div>
          ))}
        </div>
        
        {selectedApps.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Restrict selected apps from:</p>
            <div className="flex gap-4 items-center">
              <input 
                type="time" 
                value={restrictionTime.from}
                onChange={(e) => setRestrictionTime({...restrictionTime, from: e.target.value})}
                className="border border-fithabit-gray-light rounded px-3 py-1"
              />
              <span>to</span>
              <input 
                type="time" 
                value={restrictionTime.to}
                onChange={(e) => setRestrictionTime({...restrictionTime, to: e.target.value})}
                className="border border-fithabit-gray-light rounded px-3 py-1"
              />
              <Button 
                onClick={applyRestrictions}
                className="bg-fithabit-red hover:bg-fithabit-red-dark text-white"
              >
                <Plus size={16} className="mr-1" />
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-3">Currently Restricted</h4>
        {apps.filter(app => app.restricted).length > 0 ? (
          <div className="space-y-3">
            {apps.filter(app => app.restricted).map(app => (
              <div key={app.id} className="flex justify-between items-center p-3 border border-fithabit-gray-light rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{app.icon}</span>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-xs text-fithabit-gray">
                      Restricted: {app.restrictedTime?.from} - {app.restrictedTime?.to}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeRestriction(app.id)}
                  className="text-fithabit-red hover:bg-red-50"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-fithabit-gray text-sm">No apps are currently restricted</p>
        )}
      </div>
    </div>
  );
};
