import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="crypto-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3 shadow-md">
                <span className="text-2xl text-primary">₿</span>
              </div>
              <div>
                <h1 className="text-3xl logo-text">CoinAddress.io</h1>
                <p className="text-sm opacity-90">Cryptocurrency Address Verification Tool</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="page-container">
        <h1 className="page-title">About Us</h1>
        
        <div className="page-content">
          <p>
            CoinAddress.io is a cutting-edge cryptocurrency address verification tool developed by 
            <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline"> Lampstand Consulting Ltd</a>, 
            a technology company specializing in blockchain solutions and digital asset management tools.
          </p>
          
          <p>
            Our mission is to provide secure, reliable, and user-friendly tools for cryptocurrency users, 
            helping to make the blockchain ecosystem more accessible and safer for everyone.
          </p>
          
          <h2 className="page-subtitle">Our Technology</h2>
          <p>
            CoinAddress.io leverages modern web technologies to deliver a fast, secure, and intuitive 
            experience. Our platform is built using Next.js, React, and Tailwind CSS, ensuring optimal 
            performance and a responsive design that works seamlessly across all devices.
          </p>
          
          <p>
            All validation is performed client-side, meaning your cryptocurrency addresses are never 
            stored or transmitted to our servers. This approach ensures maximum privacy and security 
            for our users.
          </p>
          
          <h2 className="page-subtitle">Supported Cryptocurrencies</h2>
          <p>
            We currently support validation and information lookup for 11 major cryptocurrencies:
          </p>
          <ul className="list-disc pl-6">
            <li>Bitcoin (BTC)</li>
            <li>Ethereum (ETH)</li>
            <li>Litecoin (LTC)</li>
            <li>Bitcoin Cash (BCH)</li>
            <li>Dogecoin (DOGE)</li>
            <li>Solana (SOL)</li>
            <li>Cardano (ADA)</li>
            <li>Ripple (XRP)</li>
            <li>Polkadot (DOT)</li>
            <li>Binance Coin (BNB)</li>
            <li>Tron (TRX)</li>
          </ul>
          <p>
            We're continuously working to expand our support for additional cryptocurrencies and enhance 
            our feature set to meet the evolving needs of the blockchain community.
          </p>
          
          <h2 className="page-subtitle">About Lampstand Consulting Ltd</h2>
          <p>
            Lampstand Consulting Ltd is a technology company focused on developing innovative solutions 
            for the blockchain and cryptocurrency space. With a team of experienced developers and 
            blockchain experts, we're committed to creating tools that make digital assets more 
            accessible, secure, and user-friendly.
          </p>
          
          <p>
            Our expertise spans across blockchain development, smart contract auditing, cryptocurrency 
            wallet solutions, and decentralized application (dApp) development. We work with businesses, 
            developers, and individual users to navigate the complex world of blockchain technology.
          </p>
          
          <p>
            To learn more about Lampstand Consulting Ltd and our other projects, visit 
            <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline"> lampstand.consulting</a>.
          </p>
          
          <div className="mt-12 text-center">
            <Link href="/" className="crypto-button inline-block">
              Return to Homepage
            </Link>
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
              <Link href="/about" className="hover:text-primary-light transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-primary-light transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary-light transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-primary-light transition-colors">Contact</Link>
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
