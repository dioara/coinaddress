/**
 * Cryptocurrency address validators
 * 
 * This module provides validation functions for different cryptocurrency addresses.
 */

import * as bs58 from 'bs58';
import { PublicKey } from '@solana/web3.js';

// Bitcoin address validation
export const validateBitcoinAddress = (address: string): boolean => {
  // Bitcoin addresses start with 1, 3, or bc1
  const regex = /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[a-z0-9]{39,59}$/;
  return regex.test(address);
};

// Ethereum address validation (FIXED: Added 'i' flag for case-insensitivity)
export const validateEthereumAddress = (address: string): boolean => {
  // Ethereum addresses are 42 characters long including the '0x' prefix
  // Regex made case-insensitive to support EIP-55 checksummed addresses
  const regex = /^0x[a-fA-F0-9]{40}$/i;
  return regex.test(address);
};

// Litecoin address validation
export const validateLitecoinAddress = (address: string): boolean => {
  // Litecoin addresses start with L, M, or ltc1
  const regex = /^[LM][a-km-zA-HJ-NP-Z1-9]{26,33}$|^(ltc1)[a-z0-9]{39,59}$/;
  return regex.test(address);
};

// Bitcoin Cash address validation
export const validateBitcoinCashAddress = (address: string): boolean => {
  // Bitcoin Cash addresses start with q, p, or bitcoincash:
  const regex = /^[qp][a-z0-9]{41}$|^bitcoincash:[qp][a-z0-9]{41}$/;
  return regex.test(address);
};

// Dogecoin address validation
export const validateDogecoinAddress = (address: string): boolean => {
  // Dogecoin addresses start with D
  const regex = /^D[a-km-zA-HJ-NP-Z1-9]{26,34}$/;
  return regex.test(address);
};

// Solana address validation
export const validateSolanaAddress = (address: string): boolean => {
  try {
    // Solana addresses are Base58-encoded 32-byte public keys
    // Use PublicKey from @solana/web3.js to validate
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};

// Cardano address validation
export const validateCardanoAddress = (address: string): boolean => {
  // Cardano addresses start with addr1 (Shelley era)
  const regex = /^addr1[a-zA-Z0-9]{98,103}$/;
  return regex.test(address);
};

// Ripple (XRP) address validation
export const validateRippleAddress = (address: string): boolean => {
  // XRP addresses start with r and are 25-35 characters long
  const regex = /^r[a-zA-Z0-9]{24,34}$/;
  return regex.test(address);
};

// Polkadot address validation
export const validatePolkadotAddress = (address: string): boolean => {
  // Polkadot addresses are 47-48 characters long and start with 1
  const regex = /^1[a-zA-Z0-9]{46,47}$/;
  return regex.test(address);
};

// Binance Coin (BNB) address validation
export const validateBinanceCoinAddress = (address: string): boolean => {
  // BNB addresses on Binance Smart Chain are Ethereum-style addresses
  // BNB addresses on Binance Chain start with 'bnb'
  const ethRegex = /^0x[a-fA-F0-9]{40}$/i; // Also made case-insensitive here for consistency
  const bnbRegex = /^bnb[a-zA-Z0-9]{39}$/;
  return ethRegex.test(address) || bnbRegex.test(address);
};

// Tron (TRX) address validation
export const validateTronAddress = (address: string): boolean => {
  // Tron addresses start with T and are 34 characters long
  const regex = /^T[a-zA-Z0-9]{33}$/;
  return regex.test(address);
};

// Generic cryptocurrency address validation
export const validateAddress = (address: string, type: string): boolean => {
  switch (type.toLowerCase()) {
    case 'btc':
    case 'bitcoin':
      return validateBitcoinAddress(address);
    case 'eth':
    case 'ethereum':
      return validateEthereumAddress(address);
    case 'ltc':
    case 'litecoin':
      return validateLitecoinAddress(address);
    case 'bch':
    case 'bitcoincash':
      return validateBitcoinCashAddress(address);
    case 'doge':
    case 'dogecoin':
      return validateDogecoinAddress(address);
    case 'sol':
    case 'solana':
      return validateSolanaAddress(address);
    case 'ada':
    case 'cardano':
      return validateCardanoAddress(address);
    case 'xrp':
    case 'ripple':
      return validateRippleAddress(address);
    case 'dot':
    case 'polkadot':
      return validatePolkadotAddress(address);
    case 'bnb':
    case 'binancecoin':
      return validateBinanceCoinAddress(address);
    case 'trx':
    case 'tron':
      return validateTronAddress(address);
    default:
      return false;
  }
};

// Get address type information
export const getAddressType = (address: string): string => {
  if (validateBitcoinAddress(address)) {
    if (address.startsWith('1')) return 'Bitcoin (P2PKH)';
    if (address.startsWith('3')) return 'Bitcoin (P2SH)';
    if (address.startsWith('bc1')) return 'Bitcoin (Bech32)';
  }
  
  // Check Ethereum after BNB to avoid misidentifying BNB (BEP20) as generic Ethereum
  if (validateBinanceCoinAddress(address)) {
    if (address.startsWith('0x')) return 'Binance Coin (BEP20)';
    if (address.startsWith('bnb')) return 'Binance Coin (BEP2)';
  }

  if (validateEthereumAddress(address)) {
    return 'Ethereum';
  }
  
  if (validateLitecoinAddress(address)) {
    if (address.startsWith('L')) return 'Litecoin (P2PKH)';
    if (address.startsWith('M')) return 'Litecoin (P2SH)';
    if (address.startsWith('ltc1')) return 'Litecoin (Bech32)';
  }
  
  if (validateBitcoinCashAddress(address)) {
    return 'Bitcoin Cash';
  }
  
  if (validateDogecoinAddress(address)) {
    return 'Dogecoin';
  }
  
  if (validateSolanaAddress(address)) {
    return 'Solana';
  }
  
  if (validateCardanoAddress(address)) {
    return 'Cardano';
  }
  
  if (validateRippleAddress(address)) {
    return 'Ripple (XRP)';
  }
  
  if (validatePolkadotAddress(address)) {
    return 'Polkadot';
  }
  
  if (validateTronAddress(address)) {
    return 'Tron';
  }
  
  return 'Unknown';
};

// Check if address has valid checksum
export const hasValidChecksum = (address: string, type: string): boolean => {
  // This is a simplified implementation
  // In a real-world scenario, we would implement proper checksum validation for each coin type
  // For now, just check basic format validity
  return validateAddress(address, type);
};

