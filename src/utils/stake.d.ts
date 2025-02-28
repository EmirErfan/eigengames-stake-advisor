declare module '../utils/stake' {
    export function stakeETH(amount: number): Promise<{
      success: boolean;
      transactionHash?: string;
      message?: string;
      error?: string;
    }>;
  
    export function unstakeAll(): Promise<{
      success: boolean;
      transactionHash?: string;
      message?: string;
      error?: string;
    }>;
  
    export function mockTransactionConfirmation(txHash: string): {
      transactionHash: string;
      status: string;
      blockNumber: number;
      timestamp: number;
      rewards: {
        initialAmount: string;
        estimatedAnnualReward: string;
        nextRewardDate: string;
      };
    };
  }
  