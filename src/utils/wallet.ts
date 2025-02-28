// src/utils/wallet.ts
export async function connectWallet(): Promise<string | null> {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this feature.');
      return null;
    }
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } catch (error) {
      console.error('User rejected or error occurred:', error);
      return null;
    }
  }
  