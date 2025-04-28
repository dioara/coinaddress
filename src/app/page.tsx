import AddressVerifier from '@/components/AddressVerifier';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="crypto-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center md:justify-start">
            <div className="bg-white rounded-full p-2 mr-3 shadow-md">
              <span className="text-2xl text-primary">₿</span>
            </div>
            <div>
              <h1 className="text-3xl logo-text">CoinAddress.io</h1>
              <p className="text-sm opacity-90">Cryptocurrency Address Verification Tool</p>
            </div>
          </div>
        </div>
      </header>
      
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Verify Any Cryptocurrency Address</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Validate addresses, generate QR codes, and check balances for Bitcoin, Ethereum, 
            Solana, and other major cryptocurrencies - all in one place.
          </p>
        </div>
        
        <AddressVerifier />
        
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="crypto-card p-6 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Validation</h3>
            <p className="text-gray-600">All validation happens client-side. Your addresses are never stored or transmitted.</p>
          </div>
          
          <div className="crypto-card p-6 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Cryptocurrencies</h3>
            <p className="text-gray-600">Support for Bitcoin, Ethereum, Solana, and many other major cryptocurrencies.</p>
          </div>
          
          <div className="crypto-card p-6 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Balance Lookup</h3>
            <p className="text-gray-600">Check address balances and transaction information where APIs are available.</p>
          </div>
        </div>
      </div>
      
      <footer className="crypto-footer">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-white rounded-full p-1 mr-2">
                  <span className="text-lg text-primary">₿</span>
                </div>
                <span className="text-xl font-bold">CoinAddress.io</span>
              </div>
              <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} CoinAddress.io - All rights reserved</p>
              <p className="text-xs opacity-60 mt-1">A secure, client-side cryptocurrency address verification tool</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
              <a href="/about" className="hover:text-primary-light transition-colors">About</a>
              <a href="/privacy" className="hover:text-primary-light transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary-light transition-colors">Terms</a>
              <a href="/contact" className="hover:text-primary-light transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm opacity-60">
            <p>CoinAddress.io is not affiliated with any cryptocurrency project or company.</p>
            <p className="mt-1">Designed for educational and verification purposes only.</p>
            <p className="mt-3 company-attribution">
              Developed by <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="company-link">Lampstand Consulting Ltd</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
