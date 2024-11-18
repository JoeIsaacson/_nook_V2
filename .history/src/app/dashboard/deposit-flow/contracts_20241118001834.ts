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
] as const;
 
export const USDCContracts = [
  {
    address: usdcContractAddress,
    abi: usdcContractAbi,
    functionName: 'approve',
    // Replace with the address that needs approval to spend USDC
    args: [moonWellDepositAddress, BigInt('1000000')], // 1 USDC (6 decimals)
  },
];

const moonWellDepositAbi = [
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'recipient',
        type: 'address',
      },
    ],
    outputs: [{ type: 'bool' }],  // returns a boolean
    stateMutability: 'nonpayable',
  }
] as const;

export const moonWellContracts = [
  {
    address: moonWellDepositAddress,
    abi: moonWellDepositAbi,
    functionName: 'deposit',
    args: [1, '0xbcb6c05eE1dA1865CE07b2810CD5062fB5168Cac'],
  },
];
