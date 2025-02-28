// src/utils/stake.js

import { BrowserProvider, Contract, parseEther } from 'ethers';

// Replace with your deployed contract address
const CONTRACT_ADDRESS = '0x3d5BC5a40741Af74E88Ea26684809E84f9bBF42D';
const CONTRACT_ABI = [
  'function stake() external payable',
  'function unstakeAll() external'
];

// STAKE FUNCTION
export async function stakeETH(amount) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    // Create a provider and signer from MetaMask (ethers v6)
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Create a contract instance
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Convert the amount to Wei and call stake()
    const tx = await contract.stake({
      value: parseEther(amount.toString()),
    });

    // Wait for the transaction to be mined
    await tx.wait();

    return {
      success: true,
      transactionHash: tx.hash,
      message: 'Transaction submitted successfully',
    };
  } catch (error) {
    // If user cancels MetaMask prompt, error.code should be 4001
    if (error.code === 4001) {
      return { success: false, error: 'User rejected the transaction' };
    }
    console.error('Staking error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during staking',
    };
  }
}

// UNSTAKE FUNCTION
export async function unstakeAll() {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Call unstakeAll, which withdraws the user's entire staked balance
    const tx = await contract.unstakeAll();
    await tx.wait();

    return {
      success: true,
      transactionHash: tx.hash,
      message: 'Unstake transaction submitted successfully',
    };
  } catch (error) {
    if (error.code === 4001) {
      return { success: false, error: 'User rejected the transaction' };
    }
    console.error('Unstaking error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during unstaking',
    };
  }
}

// (Optional) Mock function for local UI simulation
export function mockTransactionConfirmation(txHash) {
  return {
    transactionHash: txHash,
    status: 'confirmed',
    blockNumber: 12345678,
    timestamp: Date.now(),
    rewards: {
      initialAmount: '32 ETH',
      estimatedAnnualReward: '1.92 ETH (6% APY)',
      nextRewardDate: new Date(Date.now() + 86400000).toISOString(),
    },
  };
}
