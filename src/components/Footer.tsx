import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">StakeAdvisor</h3>
            <p className="text-gray-400 text-sm">
            The comprehensive platform for comparing staking and restaking strategies. Powered by P2P.org, StakeAdvisor provides real-time data and personalized recommendations, helping you make informed decisions with confidence.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} StakeAdvisor. For EigenGames Hackathon.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;