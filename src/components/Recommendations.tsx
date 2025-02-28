import React, { useState } from 'react';
import { getRecommendedStrategies } from '../data/mockData';
import StrategyCard from './StrategyCard';
import { StakingStrategy } from '../types';
import { Lightbulb } from 'lucide-react';

const Recommendations: React.FC = () => {
  const [investmentSize, setInvestmentSize] = useState<number>(1);
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentDuration, setInvestmentDuration] = useState<number>(12);
  const [prioritizeLiquidity, setPrioritizeLiquidity] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<StakingStrategy[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  
  const handleGenerateRecommendations = () => {
    const results = getRecommendedStrategies(
      investmentSize,
      riskTolerance,
      investmentDuration,
      prioritizeLiquidity
    );
    setRecommendations(results);
    setHasGenerated(true);
  };
  
  const handleStrategySelect = (strategyId: string) => {
    // Scroll to simulator section
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
    
    // You would typically update some global state or context here
    console.log(`Strategy selected from recommendations: ${strategyId}`);
  };

  return (
    <section id="recommendations" className="py-8 bg-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Personalized Recommendations</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Investment Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Size (ETH)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={investmentSize}
                onChange={(e) => setInvestmentSize(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Tolerance
              </label>
              <div className="flex space-x-4">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={level}
                      checked={riskTolerance === level}
                      onChange={() => setRiskTolerance(level)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Duration (months)
              </label>
              <select
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>1 year</option>
                <option value={24}>2 years</option>
                <option value={36}>3 years</option>
                <option value={60}>5 years</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="prioritizeLiquidity"
                type="checkbox"
                checked={prioritizeLiquidity}
                onChange={(e) => setPrioritizeLiquidity(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="prioritizeLiquidity" className="ml-2 block text-sm text-gray-700">
                Prioritize liquidity (ability to unstake quickly)
              </label>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleGenerateRecommendations}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Generate Recommendations
            </button>
          </div>
        </div>
        
        {hasGenerated && (
          <>
            <div className="flex items-center mb-6">
              <Lightbulb className="text-yellow-500 mr-2" size={24} />
              <h3 className="text-xl font-semibold">Recommended Strategies for You</h3>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(strategy => (
                  <StrategyCard 
                    key={strategy.id} 
                    strategy={strategy} 
                    onSelect={handleStrategySelect} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-700 mb-4">
                  No strategies match your investment profile. Try adjusting your parameters.
                </p>
                <ul className="text-left text-sm text-gray-600 max-w-md mx-auto space-y-2">
                  <li>• Consider increasing your investment amount</li>
                  <li>• Adjust your risk tolerance</li>
                  <li>• Change your investment duration</li>
                  <li>• Toggle the liquidity preference</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Recommendations;