import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { stakingStrategies } from '../data/mockData';

const Dashboard: React.FC = () => {
  const apyData = stakingStrategies.map(strategy => ({
    name: strategy.name,
    apy: strategy.apy
  }));

  const riskData = stakingStrategies.map(strategy => ({
    name: strategy.name,
    risk: strategy.riskScore
  }));

  const tvlData = stakingStrategies.map(strategy => ({
    name: strategy.provider,
    value: strategy.tvl
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <section id="dashboard" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Staking Market Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">APY Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="apy" fill="#4F46E5" name="APY (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="risk" fill="#EF4444" name="Risk Score (1-10)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total Value Locked (TVL) Distribution</h3>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tvlData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tvlData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ETH`} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 md:mt-0 md:ml-8">
              <h4 className="font-semibold mb-2">Market Insights</h4>
              <ul className="space-y-2">
                <li>Total ETH Staked: {stakingStrategies.reduce((sum, s) => sum + s.tvl, 0).toLocaleString()} ETH</li>
                <li>Average APY: {(stakingStrategies.reduce((sum, s) => sum + s.apy, 0) / stakingStrategies.length).toFixed(2)}%</li>
                <li>Highest APY: {Math.max(...stakingStrategies.map(s => s.apy))}% (Solo Staking)</li>
                <li>Lowest Risk: {Math.min(...stakingStrategies.map(s => s.riskScore))} (Coinbase Staking)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;