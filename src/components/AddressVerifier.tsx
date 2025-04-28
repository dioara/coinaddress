"use client";

import { useState } from 'react';
import { analyzeAddress, CryptoAddressData } from '@/lib/analyzer';

export default function AddressVerifier() {
  const [address, setAddress] = useState('');
  const [cryptoType, setCryptoType] = useState('bitcoin');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CryptoAddressData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cryptoOptions = [
    { value: 'bitcoin', label: 'Bitcoin (BTC)', icon: '₿' },
    { value: 'ethereum', label: 'Ethereum (ETH)', icon: 'Ξ' },
    { value: 'litecoin', label: 'Litecoin (LTC)', icon: 'Ł' },
    { value: 'bitcoincash', label: 'Bitcoin Cash (BCH)', icon: '₿' },
    { value: 'dogecoin', label: 'Dogecoin (DOGE)', icon: 'Ð' },
    { value: 'solana', label: 'Solana (SOL)', icon: '◎' },
    { value: 'cardano', label: 'Cardano (ADA)', icon: '₳' },
    { value: 'ripple', label: 'Ripple (XRP)', icon: '✕' },
    { value: 'polkadot', label: 'Polkadot (DOT)', icon: '●' },
    { value: 'binancecoin', label: 'Binance Coin (BNB)', icon: 'B' },
    { value: 'tron', label: 'Tron (TRX)', icon: 'T' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter a cryptocurrency address');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyzeAddress(address, cryptoType);
      setResult(data);
    } catch (err) {
      setError('An error occurred while analyzing the address');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Find the current cryptocurrency option
  const currentCrypto = cryptoOptions.find(option => option.value === cryptoType) || cryptoOptions[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="crypto-card max-w-2xl mx-auto p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Cryptocurrency Address</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="cryptoType" className="block text-sm font-medium mb-2">
              Cryptocurrency Type
            </label>
            <select
              id="cryptoType"
              value={cryptoType}
              onChange={(e) => setCryptoType(e.target.value)}
              className="crypto-select w-full"
            >
              {cryptoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              {currentCrypto.label} Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter ${currentCrypto.label} address`}
              className="crypto-input w-full"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="crypto-button w-full"
          >
            {isLoading ? (
              <span className="crypto-loading">Analyzing Address...</span>
            ) : (
              <>Verify {currentCrypto.icon} Address</>
            )}
          </button>
        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md border-l-4 border-red-500">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
      
      {result && (
        <div className="crypto-result-card max-w-2xl mx-auto">
          <div className="crypto-result-header">
            <h2 className="text-xl font-semibold">
              {currentCrypto.icon} {currentCrypto.label} Verification Results
            </h2>
          </div>
          
          <div className="crypto-result-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="crypto-result-item">
                <p className="crypto-result-label">Address</p>
                <p className="crypto-result-value font-mono break-all">{result.address}</p>
              </div>
              
              <div className="crypto-result-item">
                <p className="crypto-result-label">Cryptocurrency</p>
                <p className="crypto-result-value flex items-center">
                  <span className="mr-2 text-lg">{currentCrypto.icon}</span>
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                </p>
              </div>
              
              <div className="crypto-result-item">
                <p className="crypto-result-label">Valid Format</p>
                <p className={`crypto-result-value ${result.isValid ? "valid" : "invalid"} flex items-center`}>
                  {result.isValid ? (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Valid
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Invalid
                    </>
                  )}
                </p>
              </div>
              
              <div className="crypto-result-item">
                <p className="crypto-result-label">Address Type</p>
                <p className="crypto-result-value">{result.addressType}</p>
              </div>
              
              <div className="crypto-result-item">
                <p className="crypto-result-label">Valid Checksum</p>
                <p className={`crypto-result-value ${result.hasValidChecksum ? "valid" : "invalid"} flex items-center`}>
                  {result.hasValidChecksum ? (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Valid
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Invalid
                    </>
                  )}
                </p>
              </div>
              
              {result.balance && (
                <div className="crypto-result-item">
                  <p className="crypto-result-label">Balance</p>
                  <p className="crypto-result-value font-semibold">{result.balance}</p>
                </div>
              )}
              
              {result.transactionCount !== undefined && (
                <div className="crypto-result-item">
                  <p className="crypto-result-label">Transaction Count</p>
                  <p className="crypto-result-value">{result.transactionCount}</p>
                </div>
              )}
              
              {result.lastTransaction && (
                <div className="crypto-result-item">
                  <p className="crypto-result-label">Last Transaction</p>
                  <p className="crypto-result-value">{result.lastTransaction}</p>
                </div>
              )}
            </div>
            
            {result.qrCodeUrl && (
              <div className="crypto-qr-container mt-6">
                <div className="text-center">
                  <p className="crypto-result-label mb-3">QR Code</p>
                  <img 
                    src={result.qrCodeUrl} 
                    alt="Address QR Code" 
                    className="mx-auto rounded-md"
                  />
                  <p className="text-sm mt-2 text-gray-500">Scan to use this address</p>
                </div>
              </div>
            )}
            
            {result.error && (
              <div className="crypto-note mt-6">
                <p className="font-semibold">Note:</p>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>All validation is performed client-side. Your addresses are never stored or transmitted.</p>
        <p className="mt-2">
          <span className="crypto-tooltip">
            Need help?
            <span className="tooltip-text">
              Enter a cryptocurrency address above and select the correct cryptocurrency type to verify its validity and view its details.
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
