import React from 'react';
import { StakingStrategy } from '../types';
import { ArrowRight, AlertTriangle, Droplet } from 'lucide-react';

interface StrategyCardProps {
  strategy: StakingStrategy;
  onSelect: (strategyId: string) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onSelect }) => {
  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-green-500';
    if (score <= 6) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getLiquidityColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={strategy.logoUrl} 
            alt={`${strategy.provider} logo`} 
            className="w-10 h-10 mr-3"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png';
            }}
          />
          <div>
            <h3 className="text-xl font-bold">{strategy.name}</h3>
            <p className="text-gray-600">{strategy.provider}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 text-sm">APY</p>
            <p className="text-2xl font-bold text-indigo-600">{strategy.apy}%</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Min Stake</p>
            <p className="text-xl font-semibold">{strategy.minStake} ETH</p>
          </div>
          <div className="flex items-center">
            <AlertTriangle size={16} className={getRiskColor(strategy.riskScore)} />
            <p className="ml-1 text-sm">Risk: <span className={getRiskColor(strategy.riskScore)}>{strategy.riskScore}/10</span></p>
          </div>
          <div className="flex items-center">
            <Droplet size={16} className={getLiquidityColor(strategy.liquidityScore)} />
            <p className="ml-1 text-sm">Liquidity: <span className={getLiquidityColor(strategy.liquidityScore)}>{strategy.liquidityScore}/10</span></p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">{strategy.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {strategy.lockupPeriod > 0 ? `${strategy.lockupPeriod} days lockup` : 'No lockup period'}
          </div>
          <button 
            onClick={() => onSelect(strategy.id)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Select <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;