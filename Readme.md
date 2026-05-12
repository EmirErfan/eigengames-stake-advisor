# EigenGames  

EigenGames is a decentralized gaming platform designed to bring transparent and fair play to blockchain-based games.  

## Features  
- Decentralized gaming ecosystem  
- Transparent smart contracts for fair play  
- Real-time game updates using blockchain technology  

## Getting Started  

### Prerequisites  
- Node.js (>= 14.x)  
- MetaMask or any other Web3-enabled browser extension  
- Remix IDE for smart contract deployment  

### Installation  
1. Clone the repository:  
    ```bash
    git clone https://github.com/EmirErfan/EigenGames.git
    cd EigenGames
    ```  

2. Install dependencies:  
    ```bash
    npm install
    ```  

### Running the Application  
Start the development server:  
```bash
npm run dev
```  
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.  

### Deployment  
To deploy the application:  
```bash
npm run build
npm start
```  

## Smart Contract Deployment  

1. **Deploy on Remix**:  
   - Open [Remix IDE](https://remix.ethereum.org)  
   - Create a new file and copy the smart contract code  
   - Compile the contract using the Solidity compiler  
   - Deploy on a testnet (e.g., Goerli or Sepolia) using MetaMask  

2. **Update Contract Address**:  
   - After deployment, get the newly deployed contract address  
   - Open the relevant JavaScript file (e.g., `game.js`)  
   - Locate the line with `CONTRACT_ADDRESS` and update it as follows:  
     ```js
     const CONTRACT_ADDRESS = "YOUR_NEW_CONTRACT_ADDRESS";
     ```  

```
