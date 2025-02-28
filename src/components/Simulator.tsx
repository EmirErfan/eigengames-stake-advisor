import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { stakingStrategies, generateSimulationResult } from '../data/mockData';
import { SimulationResult } from '../types';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

const Simulator: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(stakingStrategies[0].id);
  const [investmentAmount, setInvestmentAmount] = useState(1);
  const [duration, setDuration] = useState(12);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  
  useEffect(() => {
    if (selectedStrategy && investmentAmount > 0 && duration > 0) {
      const result = generateSimulationResult(selectedStrategy, investmentAmount, duration);
      setSimulationResult(result);
    }
  }, [selectedStrategy, investmentAmount, duration]);
  
  const strategy = stakingStrategies.find(s => s.id === selectedStrategy);
  
  const chartData = simulationResult?.estimatedRewards.map((value, index) => ({
    month: index + 1,
    value
  })) || [];
  
  return (
    <section id="simulator" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Staking Simulator</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Simulation Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Strategy
                  </label>
                  <select
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {stakingStrategies.map(strategy => (
                      <option key={strategy.id} value={strategy.id}>
                        {strategy.name} ({strategy.apy}% APY)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount (ETH)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Duration (months)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 month</span>
                    <span>{duration} months</span>
                    <span>5 years</span>
                  </div>
                </div>
                
                {strategy && strategy.minStake > investmentAmount && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <div className="flex">
                      <AlertTriangle className="text-yellow-400" />
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          This strategy requires a minimum stake of {strategy.minStake} ETH.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Projected Returns</h3>
              
              {simulationResult && (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: 'ETH Value', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} ETH`, 'Value']} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#4F46E5" activeDot={{ r: 8 }} name="ETH Value" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            
            {simulationResult && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="text-green-500 mr-2" size={20} />
                    <h4 className="font-semibold">Projected Returns</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    +{simulationResult.projectedReturns.toFixed(4)} ETH
                  </p>
                  <p className="text-sm text-gray-500">
                    {simulationResult.projectedAPY}% APY
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <Clock className="text-blue-500 mr-2" size={20} />
                    <h4 className="font-semibold">Final Value</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {simulationResult.estimatedRewards[simulationResult.estimatedRewards.length - 1].toFixed(4)} ETH
                  </p>
                  <p className="text-sm text-gray-500">
                    After {duration} months
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="text-yellow-500 mr-2" size={20} />
                    <h4 className="font-semibold">Risk Assessment</h4>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Slashing:</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${simulationResult.riskFactors.slashingRisk * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Liquidity:</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500" 
                          style={{ width: `${simulationResult.riskFactors.liquidityRisk * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Protocol:</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500" 
                          style={{ width: `${simulationResult.riskFactors.protocolRisk * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulator;