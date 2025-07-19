import React from 'react';
import { MemoryHierarchy } from './components/MemoryHierarchy';
import { MemoryUsageChart } from './components/MemoryUsageChart';
import { CachePerformance } from './components/CachePerformance';
import { MemoryLatencyGraph } from './components/MemoryLatencyGraph';
import { Brain, BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Memory Deep Dive</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive visualizations exploring computer memory hierarchy, performance characteristics, 
            and the fundamental concepts that drive modern computing systems.
          </p>
        </div>
        
        {/* Memory Hierarchy */}
        <div className="mb-12">
          <MemoryHierarchy />
        </div>
        
        {/* Memory Latency Graph */}
        <div className="mb-12">
          <MemoryLatencyGraph />
        </div>
        
        {/* Cache Performance */}
        <div className="mb-12">
          <CachePerformance />
        </div>
        
        {/* Process Memory Layout */}
        <div className="mb-12">
          <MemoryUsageChart />
        </div>
        
        {/* Key Concepts Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-green-600" />
            Key Memory Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-2">Locality of Reference</h3>
              <p className="text-sm text-blue-700">
                Programs tend to access data that is close in time (temporal) or space (spatial) 
                to recently accessed data. Cache systems exploit this principle.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2">Virtual Memory</h3>
              <p className="text-sm text-green-700">
                Creates an abstraction layer that gives each process its own address space, 
                enabling memory protection and efficient use of physical RAM.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-2">Memory Bandwidth</h3>
              <p className="text-sm text-purple-700">
                The rate at which data can be read from or written to memory. Modern systems 
                use multiple channels and advanced controllers to maximize throughput.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-red-500 bg-red-50">
              <h3 className="font-semibold text-red-800 mb-2">Cache Coherency</h3>
              <p className="text-sm text-red-700">
                In multi-core systems, ensures that all cores see a consistent view of memory 
                when multiple caches contain copies of the same data.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <h3 className="font-semibold text-yellow-800 mb-2">Memory Protection</h3>
              <p className="text-sm text-yellow-700">
                Hardware and software mechanisms that prevent processes from accessing 
                memory they shouldn't, ensuring system stability and security.
              </p>
            </div>
            
            <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50">
              <h3 className="font-semibold text-indigo-800 mb-2">NUMA Architecture</h3>
              <p className="text-sm text-indigo-700">
                Non-Uniform Memory Access where memory access time depends on the memory 
                location relative to the processor, important for high-performance computing.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Understanding memory is crucial for writing efficient software and optimizing system performance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
