import React, { useState, useEffect } from 'react';
import { Zap, Target, TrendingDown } from 'lucide-react';

interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
}

const cacheScenarios = [
  {
    name: 'Sequential Access',
    description: 'Accessing array elements in order',
    metrics: { hits: 85, misses: 15, hitRate: 85 },
    color: 'bg-green-500'
  },
  {
    name: 'Random Access',
    description: 'Accessing memory locations randomly',
    metrics: { hits: 45, misses: 55, hitRate: 45 },
    color: 'bg-yellow-500'
  },
  {
    name: 'Strided Access',
    description: 'Accessing every Nth element',
    metrics: { hits: 25, misses: 75, hitRate: 25 },
    color: 'bg-red-500'
  }
];

export const CachePerformance: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState({ hits: 0, misses: 0, hitRate: 0 });

  useEffect(() => {
    const scenario = cacheScenarios[selectedScenario];
    const timer = setTimeout(() => {
      setAnimatedMetrics(scenario.metrics);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedScenario]);

  const currentScenario = cacheScenarios[selectedScenario];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Zap className="w-8 h-8 mr-3 text-yellow-600" />
        Cache Performance Analysis
      </h2>
      
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          {cacheScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setSelectedScenario(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedScenario === index
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">{currentScenario.name}</h3>
          <p className="text-gray-600 text-sm">{currentScenario.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray={`${animatedMetrics.hitRate}, 100`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{animatedMetrics.hitRate}%</span>
            </div>
          </div>
          <h4 className="font-semibold text-gray-800 flex items-center justify-center">
            <Target className="w-4 h-4 mr-2 text-green-600" />
            Hit Rate
          </h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Cache Hits</span>
              <span>{animatedMetrics.hits}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${animatedMetrics.hits}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Cache Misses</span>
              <span>{animatedMetrics.misses}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${animatedMetrics.misses}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center text-green-800 mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium text-sm">Cache Hit</span>
            </div>
            <p className="text-xs text-green-700">Data found in cache (~1-10 cycles)</p>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="flex items-center text-red-800 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="font-medium text-sm">Cache Miss</span>
            </div>
            <p className="text-xs text-red-700">Data fetched from RAM (~100-300 cycles)</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Spatial Locality</h4>
          <p className="text-sm text-blue-700">
            Sequential access patterns benefit from prefetching entire cache lines, 
            improving hit rates significantly.
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Temporal Locality</h4>
          <p className="text-sm text-purple-700">
            Recently accessed data is likely to be accessed again soon, 
            making cache retention strategies crucial.
          </p>
        </div>
      </div>
    </div>
  );
};