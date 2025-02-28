import React, { useEffect } from 'react';
import { Coins } from 'lucide-react';

interface HeaderProps {
  connectedWallet: string | null;
  setConnectedWallet: (wallet: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ connectedWallet, setConnectedWallet }) => {
  // Connect to MetaMask
  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this feature.');
      return;
    }
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length > 0) {
        setConnectedWallet(accounts[0]);
      }
    } catch (error) {
      console.error('User rejected or error occurred:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
        setConnectedWallet(accounts.length > 0 ? accounts[0] : null);
      });

      window.ethereum.on?.('chainChanged', (_chainId: string) => {
        window.location.reload();
      });
    }
  }, [setConnectedWallet]);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <Coins size={32} className="text-yellow-300" />
          <h1 className="text-2xl font-bold">StakeAdvisor</h1>
          <p>Powered by P2P.org</p>
        </div>

        {/* Center: Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#dashboard" className="hover:text-yellow-300 transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#strategies" className="hover:text-yellow-300 transition-colors">
                Strategies
              </a>
            </li>
            <li>
              <a href="#simulator" className="hover:text-yellow-300 transition-colors">
                Simulator
              </a>
            </li>
            <li>
              <a href="#recommendations" className="hover:text-yellow-300 transition-colors">
                Recommendations
              </a>
            </li>
          </ul>
        </nav>

        {/* Right side: Connect Wallet or Connected Account */}
        {connectedWallet ? (
          <div className="bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg">
            {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
          </div>
        ) : (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
