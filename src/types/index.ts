export interface StakingStrategy {
  id: string;
  name: string;
  provider: string;
  apy: number;
  lockupPeriod: number; // in days
  minStake: number;
  tvl: number; // Total Value Locked in ETH
  riskScore: number; // 1-10 scale
  liquidityScore: number; // 1-10 scale
  description: string;
  logoUrl: string;
}

export interface UserProfile {
  investmentSize: number;
  riskTolerance: 'low' | 'medium' | 'high';
  investmentDuration: number; // in months
  prioritizeLiquidity: boolean;
}

export interface SimulationResult {
  strategyId: string;
  initialInvestment: number;
  projectedReturns: number;
  projectedAPY: number;
  estimatedRewards: number[];
  riskFactors: {
    slashingRisk: number;
    liquidityRisk: number;
    protocolRisk: number;
  };
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  amount: number;
  strategy: string;
}