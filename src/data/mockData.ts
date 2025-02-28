import { StakingStrategy, SimulationResult } from '../types';

export const stakingStrategies: StakingStrategy[] = [
  {
    id: 'lido-staking',
    name: 'Lido Staking',
    provider: 'Lido',
    apy: 3.1,
    lockupPeriod: 0,
    minStake: 0,
    tvl: 9800000,
    riskScore: 3,
    liquidityScore: 9,
    description: 'Liquid staking solution for ETH 2.0 with no minimum deposit and daily rewards.',
    logoUrl: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.png'
  },
  {
    id: 'rocket-pool',
    name: 'Rocket Pool',
    provider: 'Rocket Pool',
    apy: 2.94,
    lockupPeriod: 0,
    minStake: 0.01,
    tvl: 784000,
    riskScore: 4,
    liquidityScore: 8,
    description: 'Decentralized ETH staking protocol that allows users to stake with as little as 0.01 ETH.',
    logoUrl: 'https://cryptologos.cc/logos/rocket-pool-rpl-logo.png'
  },
  {
    id: 'coinbase-staking',
    name: 'Coinbase Staking',
    provider: 'Coinbase',
    apy: 2.19,
    lockupPeriod: 0,
    minStake: 0,
    tvl: 8900000,
    riskScore: 2,
    liquidityScore: 7,
    description: 'Centralized staking solution with competitive rates and institutional security.',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGFrvFc94KMgF2467-SSZX5g0mZwOgwm_Rg&s'
  },
  {
    id: 'binance-eth-staking',
    name: 'Binance ETH Staking',
    provider: 'Binance',
    apy: 4.5,
    lockupPeriod: 30,
    minStake: 0.1,
    tvl: 2010000,
    riskScore: 3,
    liquidityScore: 6,
    description: 'Flexible and locked ETH staking options with competitive APY rates.',
    logoUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png'
  },
  {
    id: 'kraken-staking',
    name: 'Kraken Staking',
    provider: 'Kraken',
    apy: 2.5,
    lockupPeriod: 0,
    minStake: 0,
    tvl: 4200000,
    riskScore: 3,
    liquidityScore: 7,
    description: 'Earn rewards on your ETH with Kraken\'s secure staking service.',
    logoUrl: 'https://logos-world.net/wp-content/uploads/2021/02/Kraken-Logo.png'
  },
  {
    id: 'solo-staking',
    name: 'Solo Staking',
    provider: 'Self-hosted',
    apy: 5.5,
    lockupPeriod: 0,
    minStake: 32,
    tvl: 17700000,
    riskScore: 7,
    liquidityScore: 3,
    description: 'Run your own validator node with full control but higher technical requirements.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png'
  }
];

export const generateSimulationResult = (
  strategyId: string, 
  initialInvestment: number, 
  months: number
): SimulationResult => {
  const strategy = stakingStrategies.find(s => s.id === strategyId);
  if (!strategy) throw new Error(`Strategy with ID ${strategyId} not found`);
  
  const monthlyRate = strategy.apy / 12 / 100;
  const estimatedRewards: number[] = [];
  let currentValue = initialInvestment;
  
  for (let i = 0; i < months; i++) {
    const monthlyReward = currentValue * monthlyRate;
    currentValue += monthlyReward;
    estimatedRewards.push(Number(currentValue.toFixed(4)));
  }
  
  return {
    strategyId,
    initialInvestment,
    projectedReturns: Number((currentValue - initialInvestment).toFixed(4)),
    projectedAPY: strategy.apy,
    estimatedRewards,
    riskFactors: {
      slashingRisk: strategy.riskScore * 0.7,
      liquidityRisk: 10 - strategy.liquidityScore,
      protocolRisk: strategy.riskScore * 0.9
    }
  };
};

export const getRecommendedStrategies = (
  investmentSize: number,
  riskTolerance: 'low' | 'medium' | 'high',
  investmentDuration: number,
  prioritizeLiquidity: boolean
): StakingStrategy[] => {
  // Filter strategies based on minimum stake
  let filtered = stakingStrategies.filter(s => s.minStake <= investmentSize);
  
  // Apply risk tolerance filter
  const riskThresholds = {
    low: 3,
    medium: 6,
    high: 10
  };
  
  filtered = filtered.filter(s => s.riskScore <= riskThresholds[riskTolerance]);
  
  // Apply liquidity preference if needed
  if (prioritizeLiquidity) {
    filtered = filtered.filter(s => s.liquidityScore >= 6);
  }
  
  // Sort by APY (higher first) and then by risk (lower first)
  return filtered.sort((a, b) => {
    if (b.apy !== a.apy) return b.apy - a.apy;
    return a.riskScore - b.riskScore;
  });
};