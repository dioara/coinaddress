/**
 * API service for fetching cryptocurrency address information
 */

import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';

// Interface for address information
export interface AddressInfo {
  address: string;
  balance?: string;
  transactionCount?: number;
  lastTransaction?: string;
  error?: string;
}

// Bitcoin address info
export const getBitcoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    const response = await axios.get(`https://blockchain.info/rawaddr/${address}?limit=1`);
    return {
      address,
      balance: (response.data.final_balance / 100000000).toFixed(8) + ' BTC',
      transactionCount: response.data.n_tx,
      lastTransaction: response.data.txs.length > 0 ? new Date(response.data.txs[0].time * 1000).toISOString() : 'None'
    };
  } catch (error) {
    console.error('Error fetching Bitcoin address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Ethereum address info
export const getEthereumAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Using Etherscan API (note: in production, you would use an API key)
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest`);
    
    if (response.data.status === '1') {
      const balance = parseInt(response.data.result) / 1e18; // Convert wei to ETH
      
      // Get transaction count
      const txCountResponse = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest`);
      const txCount = parseInt(txCountResponse.data.result, 16);
      
      return {
        address,
        balance: balance.toFixed(6) + ' ETH',
        transactionCount: txCount,
      };
    } else {
      return {
        address,
        error: response.data.message || 'Unable to fetch address information'
      };
    }
  } catch (error) {
    console.error('Error fetching Ethereum address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Litecoin address info
export const getLitecoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Using a public Litecoin API
    const response = await axios.get(`https://chain.so/api/v2/address/LTC/${address}`);
    
    if (response.data.status === 'success') {
      return {
        address,
        balance: response.data.data.balance + ' LTC',
        transactionCount: parseInt(response.data.data.txs.length),
        lastTransaction: response.data.data.txs.length > 0 ? response.data.data.txs[0].time : 'None'
      };
    } else {
      return {
        address,
        error: 'Unable to fetch address information'
      };
    }
  } catch (error) {
    console.error('Error fetching Litecoin address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Solana address info
export const getSolanaAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Connect to Solana mainnet
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const publicKey = new PublicKey(address);
    
    // Get balance
    const balance = await connection.getBalance(publicKey);
    const balanceInSOL = balance / 1e9; // Convert lamports to SOL
    
    // Get transaction count (signature count)
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
    
    return {
      address,
      balance: balanceInSOL.toFixed(9) + ' SOL',
      transactionCount: signatures.length,
      lastTransaction: signatures.length > 0 ? new Date(signatures[0].blockTime! * 1000).toISOString() : 'None'
    };
  } catch (error) {
    console.error('Error fetching Solana address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Cardano address info
export const getCardanoAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Using Blockfrost API (would need API key in production)
    const response = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`, {
      headers: { 'project_id': 'demo' } // This is a placeholder, would need real API key
    });
    
    return {
      address,
      balance: (parseInt(response.data.amount[0].quantity) / 1e6).toFixed(6) + ' ADA',
      transactionCount: response.data.tx_count,
    };
  } catch (error) {
    console.error('Error fetching Cardano address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Ripple (XRP) address info
export const getRippleAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Using XRPSCAN API
    const response = await axios.get(`https://api.xrpscan.com/api/v1/account/${address}`);
    
    return {
      address,
      balance: (parseInt(response.data.xrpBalance) / 1e6).toFixed(6) + ' XRP',
      transactionCount: response.data.txCount,
    };
  } catch (error) {
    console.error('Error fetching Ripple address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Binance Coin (BNB) address info
export const getBinanceCoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // For BEP20 (BSC) addresses
    if (address.startsWith('0x')) {
      const response = await axios.get(`https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest`);
      
      if (response.data.status === '1') {
        const balance = parseInt(response.data.result) / 1e18; // Convert wei to BNB
        
        return {
          address,
          balance: balance.toFixed(8) + ' BNB',
        };
      }
    }
    
    // For BEP2 addresses, would need different API
    
    return {
      address,
      error: 'Balance lookup limited for this cryptocurrency'
    };
  } catch (error) {
    console.error('Error fetching Binance Coin address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Tron (TRX) address info
export const getTronAddressInfo = async (address: string): Promise<AddressInfo> => {
  try {
    // Using Trongrid API
    const response = await axios.get(`https://api.trongrid.io/v1/accounts/${address}`);
    
    if (response.data.success && response.data.data.length > 0) {
      const accountData = response.data.data[0];
      const balance = accountData.balance ? parseInt(accountData.balance) / 1e6 : 0; // Convert sun to TRX
      
      return {
        address,
        balance: balance.toFixed(6) + ' TRX',
      };
    }
    
    return {
      address,
      error: 'Unable to fetch complete address information'
    };
  } catch (error) {
    console.error('Error fetching Tron address info:', error);
    return {
      address,
      error: 'Unable to fetch address information'
    };
  }
};

// Generic function to get address info based on cryptocurrency type
export const getAddressInfo = async (address: string, type: string): Promise<AddressInfo> => {
  switch (type.toLowerCase()) {
    case 'btc':
    case 'bitcoin':
      return getBitcoinAddressInfo(address);
    case 'eth':
    case 'ethereum':
      return getEthereumAddressInfo(address);
    case 'ltc':
    case 'litecoin':
      return getLitecoinAddressInfo(address);
    case 'sol':
    case 'solana':
      return getSolanaAddressInfo(address);
    case 'ada':
    case 'cardano':
      return getCardanoAddressInfo(address);
    case 'xrp':
    case 'ripple':
      return getRippleAddressInfo(address);
    case 'bnb':
    case 'binancecoin':
      return getBinanceCoinAddressInfo(address);
    case 'trx':
    case 'tron':
      return getTronAddressInfo(address);
    default:
      return {
        address,
        error: 'Balance lookup not supported for this cryptocurrency'
      };
  }
};
