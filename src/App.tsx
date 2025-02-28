import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StrategiesList from './components/StrategiesList';
import Simulator from './components/Simulator';
import Recommendations from './components/Recommendations';
import StakingProcess from './components/StakingProcess';
import Footer from './components/Footer';

function App() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        connectedWallet={connectedWallet}
        setConnectedWallet={setConnectedWallet}
      />

      <main>
        <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Optimize Your Staking Strategy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              StakeAdvisor helps you compare staking options, analyze risks, and maximize returns with real-time data and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#strategies"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Explore Strategies
              </a>
              <a
                href="#simulator"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Try Simulator
              </a>
            </div>
          </div>
        </section>

        <Dashboard />
        <StrategiesList />
        <Simulator />
        <Recommendations />
        <StakingProcess connectedWallet={connectedWallet} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
