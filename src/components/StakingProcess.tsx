import React, { useState } from 'react';
import { stakeETH, mockTransactionConfirmation, unstakeAll } from '../utils/stake';
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';

interface StakingProcessProps {
  connectedWallet: string | null;
}

const StakingProcess: React.FC<StakingProcessProps> = ({ connectedWallet }) => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<string>('0.1');
  // We use connectedWallet prop instead of a local wallet address state.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mockConfirmation, setMockConfirmation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if a wallet is connected
    if (!connectedWallet) {
      setError('Please connect your wallet before staking.');
      setIsLoading(false);
      return;
    }

    try {
      

      // Call stakeETH using the connectedWallet (the private key is ignored in our MetaMask flow)
      const result = await stakeETH(parseFloat(amount));
      if (result.success) {
        setTxHash(result.transactionHash);
        setStep(2);

        // Simulate confirmation after 2 seconds
        setTimeout(() => {
          const confirmation = mockTransactionConfirmation(result.transactionHash);
          setMockConfirmation(confirmation);
          setStep(3);
        }, 2000);
      } else {
        setError(result.error || 'Transaction failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // New function: handle unstake (unstakeAll) and reset the UI.
  const handleUnstake = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await unstakeAll();
      if (result.success) {
        // Optionally display a success message here.
        // Reset the UI state to allow new staking.
        setStep(1);
        setTxHash('');
        setMockConfirmation(null);
      } else {
        setError(result.error || 'Unstaking failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during unstaking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Stake Your ETH</h2>

        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? 'bg-indigo-600 text-white'
                      : step > stepNumber
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepNumber ? <Check size={20} /> : stepNumber}
                </div>
                <span className="mt-2 text-sm text-gray-600">
                  {stepNumber === 1
                    ? 'Enter Details'
                    : stepNumber === 2
                    ? 'Submit Transaction'
                    : 'Confirmation'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Enter Staking Details */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Enter Staking Details</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount to Stake (ETH)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    value={connectedWallet ?? ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be populated automatically once your wallet is connected.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This is a demonstration of the API integration. No actual transaction will be finalized on the blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Review <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Step 2: Transaction Submission */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Transaction Submitted</h3>

              <div className="flex items-center justify-center my-8">
                <Loader2 size={48} className="text-indigo-600 animate-spin" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Transaction Details</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="text-sm font-medium">{amount} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">From:</span>
                    <span className="text-sm font-medium">{connectedWallet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Transaction Hash:</span>
                    <span className="text-sm font-medium text-indigo-600">
                      {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="text-sm font-medium text-yellow-600">Pending</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Your transaction has been submitted to the network. Please wait while it is being processed.
                For this demo, we'll simulate confirmation in a few seconds.
              </p>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && mockConfirmation && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Transaction Confirmed!</h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Transaction Details</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="text-sm font-medium">{amount} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Transaction Hash:</span>
                    <span className="text-sm font-medium text-indigo-600">
                      {mockConfirmation.transactionHash.substring(0, 10)}...
                      {mockConfirmation.transactionHash.substring(mockConfirmation.transactionHash.length - 8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Block Number:</span>
                    <span className="text-sm font-medium">{mockConfirmation.blockNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="text-sm font-medium text-green-600">Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-indigo-700 mb-2">Staking Rewards</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-600">Initial Amount:</span>
                    <span className="text-sm font-medium">{mockConfirmation.rewards.initialAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-600">Estimated Annual Reward:</span>
                    <span className="text-sm font-medium">{mockConfirmation.rewards.estimatedAnnualReward}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-600">Next Reward Date:</span>
                    <span className="text-sm font-medium">
                      {new Date(mockConfirmation.rewards.nextRewardDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Your staking transaction has been confirmed. To simulate unstaking, click the button below.
              </p>

              {/* "Stake More ETH" button now triggers unstakeAll */}
              <button
                onClick={handleUnstake}
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  'Stake More ETH'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StakingProcess;
