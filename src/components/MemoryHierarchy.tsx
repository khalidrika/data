import React from 'react';
import { BarChart3, Clock, HardDrive, Cpu, Zap } from 'lucide-react';

interface MemoryLevel {
  name: string;
  size: string;
  speed: string;
  cost: string;
  accessTime: number;
  capacity: number;
  icon: React.ReactNode;
  color: string;
}

const memoryLevels: MemoryLevel[] = [
  {
    name: 'CPU Registers',
    size: '~1KB',
    speed: '1 cycle',
    cost: 'Very High',
    accessTime: 1,
    capacity: 1,
    icon: <Cpu className="w-6 h-6" />,
    color: 'bg-red-500'
  },
  {
    name: 'L1 Cache',
    size: '32-64KB',
    speed: '1-2 cycles',
    cost: 'High',
    accessTime: 2,
    capacity: 64,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-orange-500'
  },
  {
    name: 'L2 Cache',
    size: '256KB-1MB',
    speed: '3-10 cycles',
    cost: 'High',
    accessTime: 7,
    capacity: 1000,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-500'
  },
  {
    name: 'L3 Cache',
    size: '8-32MB',
    speed: '10-20 cycles',
    cost: 'Medium',
    accessTime: 15,
    capacity: 32000,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-green-500'
  },
  {
    name: 'Main Memory (RAM)',
    size: '8-64GB',
    speed: '100-300 cycles',
    cost: 'Medium',
    accessTime: 200,
    capacity: 64000000,
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    name: 'SSD Storage',
    size: '256GB-4TB',
    speed: '10,000+ cycles',
    cost: 'Low',
    accessTime: 10000,
    capacity: 4000000000,
    icon: <HardDrive className="w-6 h-6" />,
    color: 'bg-purple-500'
  }
];

export const MemoryHierarchy: React.FC = () => {
  const maxAccessTime = Math.max(...memoryLevels.map(level => level.accessTime));
  const maxCapacity = Math.max(...memoryLevels.map(level => level.capacity));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Clock className="w-8 h-8 mr-3 text-blue-600" />
        Memory Hierarchy
      </h2>
      
      <div className="space-y-4">
        {memoryLevels.map((level, index) => {
          const speedBarWidth = (1 - (level.accessTime / maxAccessTime)) * 100;
          const capacityBarWidth = (level.capacity / maxCapacity) * 100;
          
          return (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`${level.color} p-2 rounded-lg text-white mr-3`}>
                    {level.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{level.name}</h3>
                    <p className="text-sm text-gray-600">{level.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{level.speed}</p>
                  <p className="text-xs text-gray-500">Access Time</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Speed (Inverse of Access Time)</span>
                    <span>{speedBarWidth.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${level.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${speedBarWidth}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Capacity</span>
                    <span>{capacityBarWidth.toFixed(3)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${level.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(capacityBarWidth, 0.5)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Key Insights</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Faster memory is more expensive and has less capacity</li>
          <li>• Cache levels bridge the speed gap between CPU and RAM</li>
          <li>• Memory hierarchy exploits locality of reference for performance</li>
        </ul>
      </div>
    </div>
  );
};