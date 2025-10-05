import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface WalletSummaryProps {
  impactPoints: number;
  pendingRewards: number;
}

const WalletSummary: React.FC<WalletSummaryProps> = ({
  impactPoints,
  pendingRewards,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-gradient-to-br from-blue-500/90 to-purple-600/90 p-4 text-white shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/80">Impact Points</h3>
          <p className="text-2xl font-bold">{impactPoints}</p>
        </div>
        
        {pendingRewards > 0 && (
          <div className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-medium text-gray-800">
            {pendingRewards} pending rewards
          </div>
        )}
      </div>
      
      <Link href="/wallet">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-3 w-full rounded-lg bg-white/20 py-2 text-center text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          View Wallet
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default WalletSummary;