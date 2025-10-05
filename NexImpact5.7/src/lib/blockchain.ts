/**
 * Blockchain Simulation Module
 * 
 * This module simulates blockchain functionality for the NexImpact platform.
 * It provides methods for recording impact, verifying transactions, and managing rewards.
 * In a production environment, this would be replaced with actual blockchain integration.
 */

// Simulated blockchain transaction record
interface ImpactTransaction {
  id: string;
  userId: string;
  taskId: string;
  projectId: string;
  points: number;
  timestamp: number;
  hash: string;
  verified: boolean;
}

// In-memory storage for simulated blockchain
const transactionLedger: ImpactTransaction[] = [];

/**
 * Generates a mock blockchain hash
 */
const generateHash = (): string => {
  const characters = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 40; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

/**
 * Records a new impact transaction on the simulated blockchain
 */
export const recordImpact = (
  userId: string,
  taskId: string,
  projectId: string,
  points: number
): ImpactTransaction => {
  const transaction: ImpactTransaction = {
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    taskId,
    projectId,
    points,
    timestamp: Date.now(),
    hash: generateHash(),
    verified: true,
  };
  
  transactionLedger.push(transaction);
  
  // Simulate blockchain confirmation delay
  setTimeout(() => {
    const index = transactionLedger.findIndex(tx => tx.id === transaction.id);
    if (index !== -1) {
      transactionLedger[index].verified = true;
    }
  }, 2000);
  
  return transaction;
};

/**
 * Retrieves impact transactions for a specific user
 */
export const getUserTransactions = (userId: string): ImpactTransaction[] => {
  return transactionLedger.filter(tx => tx.userId === userId);
};

/**
 * Calculates total impact points for a user
 */
export const getUserImpactPoints = (userId: string): number => {
  return transactionLedger
    .filter(tx => tx.userId === userId && tx.verified)
    .reduce((total, tx) => total + tx.points, 0);
};

/**
 * Simulates redeeming impact points for rewards
 */
export const redeemPoints = (
  userId: string,
  points: number,
  rewardType: 'donation' | 'certification' | 'cash'
): { success: boolean; message: string; transactionHash?: string } => {
  const userPoints = getUserImpactPoints(userId);
  
  if (userPoints < points) {
    return {
      success: false,
      message: 'Insufficient impact points',
    };
  }
  
  // Record a negative transaction to deduct points
  const transaction = recordImpact(userId, 'redemption', rewardType, -points);
  
  return {
    success: true,
    message: `Successfully redeemed ${points} points for ${rewardType}`,
    transactionHash: transaction.hash,
  };
};

/**
 * Verifies the authenticity of an impact transaction
 */
export const verifyTransaction = (transactionHash: string): boolean => {
  const transaction = transactionLedger.find(tx => tx.hash === transactionHash);
  return transaction ? transaction.verified : false;
};

/**
 * Placeholder for future integration with actual blockchain networks
 */
export const connectToBlockchain = (network: 'polygon' | 'solana' | 'ethereum') => {
  console.log(`[Simulation] Connected to ${network} network`);
  return {
    isConnected: true,
    network,
    address: generateHash(),
  };
};