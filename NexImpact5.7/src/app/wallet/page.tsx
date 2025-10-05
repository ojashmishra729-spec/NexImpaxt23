import React from 'react';
import { motion } from 'framer-motion';
import WalletCard from '@/components/wallet/WalletCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function WalletPage() {
  // Mock transaction data
  const transactions = [
    { id: 1, type: 'Task Completion', project: 'Clean Water Initiative', points: 120, date: '2023-06-15' },
    { id: 2, type: 'Bonus Reward', project: 'Education for All', points: 50, date: '2023-06-10' },
    { id: 3, type: 'Task Completion', project: 'Reforestation Project', points: 85, date: '2023-06-05' },
    { id: 4, type: 'Collaboration Bonus', project: 'Clean Water Initiative', points: 30, date: '2023-05-28' },
    { id: 5, type: 'Task Completion', project: 'Digital Literacy Program', points: 100, date: '2023-05-20' },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Impact Wallet</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your impact and rewards</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WalletCard 
            impactPoints={385} 
            completedTasks={8} 
            pendingRewards={2} 
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Impact History</h2>
            
            <div className="overflow-hidden rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {transactions.map((transaction) => (
                    <motion.tr 
                      key={transaction.id}
                      variants={itemVariants}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.type}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.project}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-emerald-600">+{transaction.points}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{transaction.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Redeem Impact</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Convert your impact points into real-world benefits or donate to causes
            </p>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-gray-700 dark:from-gray-700 dark:to-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Donation to Causes</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Support ongoing projects</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">100 pts</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:border-gray-700 dark:from-gray-700 dark:to-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Skill Certification</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Verify your impact skills</p>
                  </div>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">250 pts</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 dark:border-gray-700 dark:from-gray-700 dark:to-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Cash Rewards</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Convert to local currency</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">500 pts</span>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-center font-medium text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700"
              >
                Redeem Points
              </motion.button>
            </div>
          </motion.div>
          
          {/* Blockchain verification section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Blockchain Verification</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Your impact is verified and recorded on blockchain for transparency
            </p>
            
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Verified Impact Record</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: Today at 10:30 AM</p>
                </div>
              </div>
              <div className="mt-3 overflow-hidden rounded bg-gray-100 p-2 font-mono text-xs text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}