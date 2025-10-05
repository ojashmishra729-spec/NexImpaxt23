import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface WalletCardProps {
  className?: string;
  impactPoints: number;
  completedTasks: number;
  pendingRewards: number;
}

const WalletCard: React.FC<WalletCardProps> = ({
  className,
  impactPoints,
  completedTasks,
  pendingRewards,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    
    // Create confetti effect
    const end = Date.now() + 1000;
    const colors = ['#5B6EF5', '#9B51E0', '#FFD166'];
    
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setShowConfetti(false), 1000);
      }
    }());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/90 to-purple-600/90 p-6 text-white shadow-xl backdrop-blur-sm",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Impact Wallet</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/20 p-2"
            aria-label="Wallet settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>
        </div>
        
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-white/70">Total Impact Points</p>
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ scale: 1 }}
              animate={showConfetti ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {impactPoints}
            </motion.h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerConfetti}
            className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg"
          >
            Claim Rewards
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-sm text-white/70">Completed Tasks</p>
            <p className="text-xl font-semibold">{completedTasks}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-sm text-white/70">Pending Rewards</p>
            <p className="text-xl font-semibold">{pendingRewards}</p>
          </div>
        </div>
        
        {/* Blockchain simulation indicator */}
        <div className="mt-4 flex items-center text-xs text-white/70">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Blockchain-verified impact</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletCard;