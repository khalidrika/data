import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';

interface MemorySegment {
  name: string;
  size: number;
  color: string;
  description: string;
}

const processMemoryLayout: MemorySegment[] = [
  { name: 'Stack', size: 8, color: 'bg-red-500', description: 'Local variables, function calls' },
  { name: 'Free Space', size: 45, color: 'bg-gray-200', description: 'Available memory' },
  { name: 'Heap', size: 25, color: 'bg-blue-500', description: 'Dynamic allocation' },
  { name: 'BSS', size: 8, color: 'bg-yellow-500', description: 'Uninitialized globals' },
  { name: 'Data', size: 7, color: 'bg-green-500', description: 'Initialized globals' },
  { name: 'Text', size: 7, color: 'bg-purple-500', description: 'Program code' }
];

export const MemoryUsageChart: React.FC = () => {
  const [animatedSizes, setAnimatedSizes] = useState(processMemoryLayout.map(() => 0));
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSizes(processMemoryLayout.map(segment => segment.size));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const totalSize = processMemoryLayout.reduce((sum, segment) => sum + segment.size, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Activity className="w-8 h-8 mr-3 text-green-600" />
        Process Memory Layout
      </h2>
      
      <div className="mb-6">
        <div className="flex rounded-lg overflow-hidden h-16 border-2 border-gray-300">
          {processMemoryLayout.map((segment, index) => (
            <div
              key={index}
              className={`${segment.color} cursor-pointer transition-all duration-700 flex items-center justify-center relative group`}
              style={{ 
                width: `${(animatedSizes[index] / totalSize) * 100}%`,
                minWidth: animatedSizes[index] > 0 ? '20px' : '0px'
              }}
              onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
              onMouseEnter={() => setSelectedSegment(index)}
              onMouseLeave={() => setSelectedSegment(null)}
            >
              {animatedSizes[index] > 5 && (
                <span className="text-white font-semibold text-xs">
                  {segment.name}
                </span>
              )}
              
              {selectedSegment === index && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white p-2 rounded shadow-lg z-10 whitespace-nowrap">
                  <div className="text-sm font-semibold">{segment.name}</div>
                  <div className="text-xs">{segment.description}</div>
                  <div className="text-xs">{segment.size}% of address space</div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Low Memory (0x0000)</span>
          <span>High Memory (0xFFFF)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {processMemoryLayout.map((segment, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              selectedSegment === index ? 'border-gray-400 shadow-md' : 'border-gray-200'
            }`}
            onClick={() => setSelectedSegment(selectedSegment === index ? null : index)}
          >
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 ${segment.color} rounded mr-2`}></div>
              <span className="font-semibold text-sm">{segment.name}</span>
            </div>
            <p className="text-xs text-gray-600">{segment.description}</p>
            <p className="text-xs font-medium text-gray-800 mt-1">{segment.size}%</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Stack Growth
          </h4>
          <p className="text-sm text-green-700">
            Stack grows downward from high memory addresses. Each function call pushes a new frame.
          </p>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Heap Growth
          </h4>
          <p className="text-sm text-orange-700">
            Heap grows upward from low memory. Dynamic allocation can lead to fragmentation.
          </p>
        </div>
      </div>
    </div>
  );
};