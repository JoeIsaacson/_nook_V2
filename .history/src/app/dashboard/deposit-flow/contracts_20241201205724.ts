// replicate this transaction on Base https://basescan.org/tx/0xe1e2956a90e3431da3035e3dc4f20c3f6e2a587a94f94460d241c88f49a9f76c
const usdcContractAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // USDC on Base
const moonWellDepositAddress = '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22'; // Moonwell USDC Market on Base

const usdcContractAbi = [
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

export const generateUSDCContracts = (inputAmount: string) => {
  return [{
    to: usdcContractAddress,
    abi: usdcContractAbi,
    functionName: 'approve',
    args: [
      moonWellDepositAddress, 
      BigInt(Number(inputAmount) * 1000000) // Convert to USDC decimals (6)
    ],
  }];
};

const moonWellDepositAbi = [
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'mintAmount',
        type: 'uint256',
      },
    ],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'payable',
  },
] as const;

export const generateMoonwellContracts = (inputAmount: string) => {
  return [{
    to: moonWellDepositAddress,
    abi: moonWellDepositAbi,
    functionName: 'mint',
    args: [
      BigInt(Number(inputAmount) * 1000000) // Convert to USDC decimals (6)
    ],
  }];
};
