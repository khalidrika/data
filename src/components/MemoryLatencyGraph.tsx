import React, { useState, useEffect } from 'react';
import { Clock, Cpu, Database } from 'lucide-react';

interface LatencyData {
  component: string;
  latency: number;
  unit: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const latencyData: LatencyData[] = [
  {
    component: 'CPU Register',
    latency: 1,
    unit: 'cycle',
    description: 'Immediate access to CPU registers',
    icon: <Cpu className="w-5 h-5" />,
    color: 'bg-red-500'
  },
  {
    component: 'L1 Cache',
    latency: 4,
    unit: 'cycles',
    description: 'First level cache on CPU',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-orange-500'
  },
  {
    component: 'L2 Cache',
    latency: 12,
    unit: 'cycles',
    description: 'Second level cache',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-yellow-500'
  },
  {
    component: 'L3 Cache',
    latency: 38,
    unit: 'cycles',
    description: 'Shared cache between cores',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  {
    component: 'Main Memory',
    latency: 200,
    unit: 'cycles',
    description: 'System RAM access',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    component: 'SSD',
    latency: 50000,
    unit: 'cycles',
    description: 'Solid state drive access',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-purple-500'
  }
];

export const MemoryLatencyGraph: React.FC = () => {
  const [animatedHeights, setAnimatedHeights] = useState(latencyData.map(() => 0));
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [logScale, setLogScale] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeights(latencyData.map(item => item.latency));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const maxLatency = Math.max(...latencyData.map(item => item.latency));
  const maxLogLatency = Math.log10(maxLatency);

  const getBarHeight = (latency: number, animatedLatency: number) => {
    if (logScale) {
      const logLatency = latency > 0 ? Math.log10(latency) : 0;
      const animatedLogLatency = animatedLatency > 0 ? Math.log10(animatedLatency) : 0;
      return (animatedLogLatency / maxLogLatency) * 100;
    } else {
      return (animatedLatency / maxLatency) * 100;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Clock className="w-8 h-8 mr-3 text-indigo-600" />
          Memory Access Latency
        </h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Scale:</span>
          <button
            onClick={() => setLogScale(!logScale)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              logScale 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {logScale ? 'Logarithmic' : 'Linear'}
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-end justify-between h-64 bg-gray-50 rounded-lg p-4">
          {latencyData.map((item, index) => {
            const barHeight = getBarHeight(item.latency, animatedHeights[index]);
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center flex-1 mx-1"
                onMouseEnter={() => setSelectedBar(index)}
                onMouseLeave={() => setSelectedBar(null)}
              >
                <div className="relative flex-1 flex items-end w-full">
                  <div
                    className={`${item.color} w-full rounded-t-lg transition-all duration-1000 cursor-pointer hover:opacity-80 relative`}
                    style={{ 
                      height: `${Math.max(barHeight, 2)}%`,
                      minHeight: '8px'
                    }}
                  >
                    {selectedBar === index && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-nowrap z-10">
                        <div className="text-sm font-semibold">{item.component}</div>
                        <div className="text-xs">{item.latency} {item.unit}</div>
                        <div className="text-xs text-gray-300">{item.description}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 text-center">
                  <div className={`${item.color} p-1 rounded text-white mx-auto mb-1`}>
                    {item.icon}
                  </div>
                  <div className="text-xs font-medium text-gray-700 leading-tight">
                    {item.component.split(' ').map((word, i) => (
                      <div key={i}>{word}</div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.latency} {item.unit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Memory Wall</h4>
          <p className="text-sm text-yellow-700">
            The growing gap between processor speed and memory latency. 
            CPUs have become much faster while memory latency improvements lag behind.
          </p>
        </div>
        
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-semibold text-indigo-800 mb-2">Cache Hierarchy</h4>
          <p className="text-sm text-indigo-700">
            Multiple cache levels bridge the latency gap, with each level trading 
            capacity for speed to optimize overall performance.
          </p>
        </div>
      </div>
      
      {logScale && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Logarithmic scale:</strong> Each step represents a 10x increase in latency. 
            This scale better shows the dramatic differences between memory hierarchy levels.
          </p>
        </div>
      )}
    </div>
  );
};