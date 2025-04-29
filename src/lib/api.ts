/**
 * API service for fetching cryptocurrency address information
 * 
 * Uses best-effort public, keyless APIs. Information may be unavailable due to rate limits.
 */

import axios from 'axios';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// --- Interface for Address Information ---
export interface AddressInfo {
  address: string;
  balance?: string;         // Format: "1.234567 BTC"
  transactionCount?: number;
  lastTransaction?: string; // ISO 8601 format string
  error?: string;         // Only used for *critical* errors preventing any info retrieval
}

// --- Helper Function for Logging API Errors ---
const logApiError = (error: any, coinName: string, address: string) => {
  let errorMessage = `Failed to fetch ${coinName} info for ${address}.`;
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 429) {
      errorMessage += ' Reason: API rate limit likely exceeded.';
    } else if (error.response?.status === 403) {
      errorMessage += ' Reason: API access forbidden (public endpoint restriction?).';
    } else if (error.response?.data?.message || error.response?.data?.result) {
      errorMessage += ` Reason: ${error.response.data.message || error.response.data.result}`;
    } else if (error.message) {
        errorMessage += ` Reason: ${error.message}`;
    }
  } else if (error instanceof Error) {
      errorMessage += ` Reason: ${error.message}`;
  }
  console.warn(errorMessage); // Log as warning, not critical error
};

// --- Bitcoin (BTC) ---
// Uses Blockchain.info - generally reliable without keys for basic info
export const getBitcoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  let balance: string | undefined;
  let transactionCount: number | undefined;
  let lastTransaction: string | undefined;

  try {
    const response = await axios.get(`https://blockchain.info/rawaddr/${address}?limit=1`);
    const data = response.data;
    balance = (data.final_balance / 100000000).toFixed(8) + ' BTC';
    transactionCount = data.n_tx;
    if (data.txs.length > 0 && data.txs[0].time) {
        lastTransaction = new Date(data.txs[0].time * 1000).toISOString();
    }
  } catch (error) {
    logApiError(error, 'Bitcoin', address);
    // Don't return error, just unavailable data
  }
  return { address, balance, transactionCount, lastTransaction };
};

// --- Ethereum (ETH) ---
// Uses Etherscan public API - subject to rate limits
export const getEthereumAddressInfo = async (address: string): Promise<AddressInfo> => {
  const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
  let balance: string | undefined;
  let transactionCount: number | undefined;
  let lastTransaction: string | undefined;

  try {
    // Fetch balance
    const balanceResponse = await axios.get(ETHERSCAN_API_URL, {
      params: { module: 'account', action: 'balance', address: address, tag: 'latest' }
    });
    if (balanceResponse.data.status === '1') {
      const balanceInWei = parseInt(balanceResponse.data.result);
      balance = (balanceInWei / 1e18).toFixed(6) + ' ETH';
    } else {
        throw new Error(`Balance fetch failed: ${balanceResponse.data.message || balanceResponse.data.result}`);
    }
  } catch (error) {
    logApiError(error, 'Ethereum Balance', address);
  }

  try {
    // Fetch transaction count
    const txCountResponse = await axios.get(ETHERSCAN_API_URL, {
      params: { module: 'proxy', action: 'eth_getTransactionCount', address: address, tag: 'latest' }
    });
    const txCountResult = txCountResponse.data.result;
    if (txCountResult && /^0x[0-9a-fA-F]+$/.test(txCountResult)) {
        transactionCount = parseInt(txCountResult, 16);
    } else {
        // Handle case where account might not exist yet but address is valid
        transactionCount = 0;
    }
  } catch (error) {
    logApiError(error, 'Ethereum TxCount', address);
  }

  try {
    // Fetch last transaction
    const txListResponse = await axios.get(ETHERSCAN_API_URL, {
      params: { module: 'account', action: 'txlist', address: address, startblock: 0, endblock: 99999999, page: 1, offset: 1, sort: 'desc' }
    });
    if (txListResponse.data.status === '1' && txListResponse.data.result.length > 0 && txListResponse.data.result[0].timeStamp) {
      lastTransaction = new Date(parseInt(txListResponse.data.result[0].timeStamp) * 1000).toISOString();
    }
  } catch (error) {
    logApiError(error, 'Ethereum LastTx', address);
  }

  return { address, balance, transactionCount, lastTransaction };
};

// --- Litecoin (LTC) ---
// Uses Blockchair public API
export const getLitecoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  let balance: string | undefined;
  let transactionCount: number | undefined;
  // let lastTransaction: string | undefined; // Blockchair dashboard doesn't easily provide this

  try {
    const response = await axios.get(`https://api.blockchair.com/litecoin/dashboards/address/${address}?limit=1`);
    const data = response.data.data[address];
    if (data?.address) {
        balance = (data.address.balance / 100000000).toFixed(8) + ' LTC';
        transactionCount = data.address.transaction_count;
    } else {
        // Handle case where address might be valid but has no history on Blockchair yet
        balance = '0.00000000 LTC';
        transactionCount = 0;
    }
  } catch (error) {
    logApiError(error, 'Litecoin', address);
  }
  return { address, balance, transactionCount /*, lastTransaction */ };
};

// --- Solana (SOL) ---
// Uses public RPC - may be unreliable / rate-limited / forbidden (403)
export const getSolanaAddressInfo = async (address: string): Promise<AddressInfo> => {
  let balance: string | undefined;
  // let transactionCount: number | undefined; // Not reliably available via public RPC
  let lastTransaction: string | undefined;

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const publicKey = new PublicKey(address);

    // Get balance
    const balanceLamports = await connection.getBalance(publicKey);
    balance = (balanceLamports / LAMPORTS_PER_SOL).toFixed(9) + ' SOL';

  } catch (error) {
      // If balance fails, likely the whole thing will fail
      logApiError(error, 'Solana Balance', address);
      // Return early if balance fails, as other calls likely will too
      return { address }; 
  }

  try {
      // Get last signature time
      const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed'); // Re-create connection just in case
      const publicKey = new PublicKey(address);
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 1 });
      if (signatures.length > 0 && signatures[0].blockTime) {
          lastTransaction = new Date(signatures[0].blockTime * 1000).toISOString();
      }
  } catch(error) {
      logApiError(error, 'Solana LastTx', address);
  }

  return { address, balance, /* transactionCount, */ lastTransaction };
};

// --- Cardano (ADA) ---
// Public APIs for balance/tx are scarce without keys. Returning unavailable.
export const getCardanoAddressInfo = async (address: string): Promise<AddressInfo> => {
  console.warn('Cardano info requires API key (e.g., Blockfrost) for reliable fetching.');
  return { address }; // Return only address, other fields will be undefined
};

// --- Ripple (XRP) ---
// Uses XRPL.org public data API
export const getRippleAddressInfo = async (address: string): Promise<AddressInfo> => {
  let balance: string | undefined;
  let transactionCount: number | undefined;
  // let lastTransaction: string | undefined; // Requires account_tx

  try {
    const response = await axios.post('https://s1.ripple.com:51234/', { // s2.ripple.com:51234 backup
      method: 'account_info',
      params: [{ account: address, strict: true, ledger_index: 'validated' }]
    });

    if (response.data.result.error === 'actNotFound') {
      balance = '0.000000 XRP';
      transactionCount = 0;
    } else if (response.data.result.status === 'success' && response.data.result.account_data) {
      const accountData = response.data.result.account_data;
      balance = (parseInt(accountData.Balance) / 1e6).toFixed(6) + ' XRP'; // Drops to XRP
      transactionCount = accountData.Sequence; // Approximates originated tx count
    } else {
        throw new Error(response.data.result.error_message || 'Failed to fetch XRP account info');
    }
  } catch (error) {
    logApiError(error, 'Ripple', address);
  }
  return { address, balance, transactionCount /*, lastTransaction */ };
};

// --- Binance Coin (BNB) ---
// Uses BscScan public API - subject to rate limits
export const getBinanceCoinAddressInfo = async (address: string): Promise<AddressInfo> => {
  const BSCSCAN_API_URL = 'https://api.bscscan.com/api';
  let balance: string | undefined;
  let transactionCount: number | undefined;
  let lastTransaction: string | undefined;

  if (address.startsWith('0x')) { // BEP20 (BSC)
      try {
          const balanceResponse = await axios.get(BSCSCAN_API_URL, {
              params: { module: 'account', action: 'balance', address: address, tag: 'latest' }
          });
          if (balanceResponse.data.status === '1') {
              balance = (parseInt(balanceResponse.data.result) / 1e18).toFixed(8) + ' BNB';
          } else {
              throw new Error(`Balance fetch failed: ${balanceResponse.data.message || balanceResponse.data.result}`);
          }
      } catch (error) {
          logApiError(error, 'BNB Balance', address);
      }

      try {
          const txCountResponse = await axios.get(BSCSCAN_API_URL, {
              params: { module: 'proxy', action: 'eth_getTransactionCount', address: address, tag: 'latest' }
          });
          const txCountResult = txCountResponse.data.result;
          if (txCountResult && /^0x[0-9a-fA-F]+$/.test(txCountResult)) {
              transactionCount = parseInt(txCountResult, 16);
          } else {
              transactionCount = 0;
          }
      } catch (error) {
          logApiError(error, 'BNB TxCount', address);
      }

      try {
          const txListResponse = await axios.get(BSCSCAN_API_URL, {
              params: { module: 'account', action: 'txlist', address: address, startblock: 0, endblock: 99999999, page: 1, offset: 1, sort: 'desc' }
          });
          if (txListResponse.data.status === '1' && txListResponse.data.result.length > 0 && txListResponse.data.result[0].timeStamp) {
              lastTransaction = new Date(parseInt(txListResponse.data.result[0].timeStamp) * 1000).toISOString();
          }
      } catch (error) {
          logApiError(error, 'BNB LastTx', address);
      }

  } else if (address.startsWith('bnb')) { // BEP2
      console.warn('BEP2 BNB address info not implemented.');
      // No easily accessible public, keyless API found for BEP2 balance/tx
  } else {
      console.warn('Invalid BNB address format detected in getBinanceCoinAddressInfo');
  }

  return { address, balance, transactionCount, lastTransaction };
};

// --- Tron (TRX) ---
// Uses TronGrid public API - subject to rate limits
export const getTronAddressInfo = async (address: string): Promise<AddressInfo> => {
  const TRONGRID_API_URL = 'https://api.trongrid.io';
  let balance: string | undefined;
  // let transactionCount: number | undefined; // Not easily available
  let lastTransaction: string | undefined;

  try {
    const response = await axios.get(`${TRONGRID_API_URL}/v1/accounts/${address}`);
    if (response.data.success && response.data.data.length > 0) {
      const accountData = response.data.data[0];
      balance = accountData.balance ? (parseInt(accountData.balance) / 1e6).toFixed(6) + ' TRX' : '0.000000 TRX'; // Sun to TRX
    } else if (response.data.success && response.data.data.length === 0) {
      balance = '0.000000 TRX';
      // transactionCount = 0; // Assume 0 if account exists but no data
    } else {
      throw new Error(response.data.error || 'Failed to fetch Tron account data');
    }
  } catch (error) {
    logApiError(error, 'Tron Balance', address);
  }

  try {
      const txResponse = await axios.get(`${TRONGRID_API_URL}/v1/accounts/${address}/transactions?limit=1&order_by=block_timestamp,desc`);
      if (txResponse.data.success && txResponse.data.data.length > 0 && txResponse.data.data[0].block_timestamp) {
          lastTransaction = new Date(txResponse.data.data[0].block_timestamp).toISOString();
      }
  } catch (error) {
      logApiError(error, 'Tron LastTx', address);
  }

  return { address, balance, /* transactionCount, */ lastTransaction };
};

// --- Placeholder for other networks ---
const getUnsupportedAddressInfo = async (address: string, coinName: string): Promise<AddressInfo> => {
    console.warn(`Balance/Tx lookup using public APIs for ${coinName} is not implemented or unreliable.`);
    return { address }; // Return only address
};

// --- Generic function to get address info ---
export const getAddressInfo = async (address: string, type: string): Promise<AddressInfo> => {
  switch (type.toLowerCase()) {
    case 'btc': case 'bitcoin':
      return getBitcoinAddressInfo(address);
    case 'eth': case 'ethereum':
      return getEthereumAddressInfo(address);
    case 'ltc': case 'litecoin':
      return getLitecoinAddressInfo(address);
    case 'sol': case 'solana':
      return getSolanaAddressInfo(address);
    case 'ada': case 'cardano':
      return getCardanoAddressInfo(address); // Returns unavailable
    case 'xrp': case 'ripple':
      return getRippleAddressInfo(address);
    case 'bnb': case 'binancecoin':
      return getBinanceCoinAddressInfo(address);
    case 'trx': case 'tron':
      return getTronAddressInfo(address);
    // Add other supported types here
    case 'bch': case 'bitcoincash':
        return getUnsupportedAddressInfo(address, 'Bitcoin Cash');
    case 'doge': case 'dogecoin':
        return getUnsupportedAddressInfo(address, 'Dogecoin');
    case 'dot': case 'polkadot':
        return getUnsupportedAddressInfo(address, 'Polkadot');
    default:
      console.warn(`Balance lookup not supported for cryptocurrency type: ${type}`);
      return { address }; // Return only address
  }
};

