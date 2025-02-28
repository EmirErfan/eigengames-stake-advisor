import React, { useState } from 'react';
import StrategyCard from './StrategyCard';
import { stakingStrategies } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

const StrategiesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'apy' | 'risk' | 'liquidity'>('apy');
  const [filterMinStake, setFilterMinStake] = useState<number | null>(null);
  
  const handleStrategySelect = (strategyId: string) => {
    // Scroll to simulator section
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
    
    // You would typically update some global state or context here
    console.log(`Strategy selected: ${strategyId}`);
  };
  
  const filteredStrategies = stakingStrategies
    .filter(strategy => 
      strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      strategy.provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(strategy => filterMinStake === null || strategy.minStake <= filterMinStake)
    .sort((a, b) => {
      if (sortBy === 'apy') return b.apy - a.apy;
      if (sortBy === 'risk') return a.riskScore - b.riskScore;
      return b.liquidityScore - a.liquidityScore;
    });

  return (
    <section id="strategies" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Available Staking Strategies</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or provider..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'apy' | 'risk' | 'liquidity')}
              >
                <option value="apy">Sort by: Highest APY</option>
                <option value="risk">Sort by: Lowest Risk</option>
                <option value="liquidity">Sort by: Highest Liquidity</option>
              </select>
            </div>
            
            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterMinStake === null ? 'all' : filterMinStake.toString()}
                onChange={(e) => setFilterMinStake(e.target.value === 'all' ? null : Number(e.target.value))}
              >
                <option value="all">All Min Stakes</option>
                <option value="0.01">≤ 0.01 ETH</option>
                <option value="0.1">≤ 0.1 ETH</option>
                <option value="1">≤ 1 ETH</option>
                <option value="32">≤ 32 ETH</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map(strategy => (
            <StrategyCard 
              key={strategy.id} 
              strategy={strategy} 
              onSelect={handleStrategySelect} 
            />
          ))}
          
          {filteredStrategies.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No strategies match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StrategiesList;