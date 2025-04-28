import { validateAddress, getAddressType, hasValidChecksum } from '@/lib/validators';
import { getAddressInfo } from '@/lib/api';
import { generateCryptoQRCode } from '@/lib/qrcode';

export interface CryptoAddressData {
  address: string;
  type: string;
  isValid: boolean;
  addressType: string;
  hasValidChecksum: boolean;
  balance?: string;
  transactionCount?: number;
  lastTransaction?: string;
  qrCodeUrl?: string;
  error?: string;
}

export async function analyzeAddress(address: string, type: string): Promise<CryptoAddressData> {
  // Validate the address
  const isValid = validateAddress(address, type);
  
  // If not valid, return early with basic info
  if (!isValid) {
    return {
      address,
      type,
      isValid: false,
      addressType: 'Invalid',
      hasValidChecksum: false,
      error: 'Invalid address format'
    };
  }
  
  // Get address type information
  const addressType = getAddressType(address);
  
  // Check if address has valid checksum
  const validChecksum = hasValidChecksum(address, type);
  
  try {
    // Generate QR code
    const qrCodeUrl = await generateCryptoQRCode(address, type);
    
    // Get address information from blockchain
    const addressInfo = await getAddressInfo(address, type);
    
    // Return complete data
    return {
      address,
      type,
      isValid,
      addressType,
      hasValidChecksum: validChecksum,
      balance: addressInfo.balance,
      transactionCount: addressInfo.transactionCount,
      lastTransaction: addressInfo.lastTransaction,
      qrCodeUrl,
      error: addressInfo.error
    };
  } catch (error) {
    console.error('Error analyzing address:', error);
    
    // Return partial data if there was an error
    return {
      address,
      type,
      isValid,
      addressType,
      hasValidChecksum: validChecksum,
      error: 'Error fetching complete address information'
    };
  }
}
