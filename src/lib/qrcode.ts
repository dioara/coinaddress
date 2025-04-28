/**
 * QR Code generator for cryptocurrency addresses
 */

import QRCode from 'qrcode';

// Generate QR code as data URL
export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 250,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Generate QR code with cryptocurrency prefix
export const generateCryptoQRCode = async (address: string, type: string): Promise<string> => {
  let data = address;
  
  // Add appropriate prefix based on cryptocurrency type
  switch (type.toLowerCase()) {
    case 'btc':
    case 'bitcoin':
      data = `bitcoin:${address}`;
      break;
    case 'eth':
    case 'ethereum':
      data = `ethereum:${address}`;
      break;
    case 'ltc':
    case 'litecoin':
      data = `litecoin:${address}`;
      break;
    case 'bch':
    case 'bitcoincash':
      // If address doesn't already have the prefix
      if (!address.startsWith('bitcoincash:')) {
        data = `bitcoincash:${address}`;
      }
      break;
    case 'sol':
    case 'solana':
      data = `solana:${address}`;
      break;
    case 'ada':
    case 'cardano':
      data = `cardano:${address}`;
      break;
    case 'xrp':
    case 'ripple':
      data = `ripple:${address}`;
      break;
    case 'dot':
    case 'polkadot':
      data = `polkadot:${address}`;
      break;
    case 'bnb':
    case 'binancecoin':
      // Different prefix based on chain type
      if (address.startsWith('0x')) {
        data = `binance:${address}`; // BEP20
      } else if (address.startsWith('bnb')) {
        data = `binance:${address}`; // BEP2
      }
      break;
    case 'trx':
    case 'tron':
      data = `tron:${address}`;
      break;
    // Default case - just use the address as is
  }
  
  return generateQRCode(data);
};
