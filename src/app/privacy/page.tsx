import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="page-title">Privacy Policy</h1>
        
        <div className="page-content">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p>
            At CoinAddress.io, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website. Please read this privacy policy 
            carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
          
          <h2 className="page-subtitle">Information We Collect</h2>
          
          <p>
            <strong>We do not collect personal information.</strong> CoinAddress.io is designed to operate entirely 
            client-side, meaning all cryptocurrency address validation and information processing happens in your 
            browser. We do not store or transmit your cryptocurrency addresses to our servers.
          </p>
          
          <p>
            We may collect anonymous usage data such as:
          </p>
          <ul className="list-disc pl-6">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages of our website that you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Other statistics</li>
          </ul>
          
          <h2 className="page-subtitle">How We Use Your Information</h2>
          
          <p>
            Any anonymous usage information we collect is used solely for the purpose of improving our website 
            and enhancing user experience. Specifically, we may use this data to:
          </p>
          <ul className="list-disc pl-6">
            <li>Analyze usage patterns to improve site functionality</li>
            <li>Diagnose technical problems</li>
            <li>Enhance the security of our service</li>
            <li>Monitor the effectiveness of our service</li>
          </ul>
          
          <h2 className="page-subtitle">Third-Party Services</h2>
          
          <p>
            CoinAddress.io uses public blockchain APIs to retrieve information about cryptocurrency addresses. 
            When you enter a cryptocurrency address and request information, your browser may send that address 
            to third-party blockchain explorers to retrieve balance and transaction information. These third-party 
            services have their own privacy policies and data collection practices.
          </p>
          
          <h2 className="page-subtitle">Cookies</h2>
          
          <p>
            We do not use cookies for tracking or data collection purposes. Any cookies used are strictly necessary 
            for the functioning of the website.
          </p>
          
          <h2 className="page-subtitle">Security</h2>
          
          <p>
            We implement reasonable precautions to protect your information. However, no electronic transmission 
            over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot 
            promise or guarantee absolute security.
          </p>
          
          <h2 className="page-subtitle">Children's Privacy</h2>
          
          <p>
            Our service is not directed to anyone under the age of 18. We do not knowingly collect personal 
            information from children under 18. If you are a parent or guardian and you are aware that your child 
            has provided us with personal information, please contact us.
          </p>
          
          <h2 className="page-subtitle">Changes to This Privacy Policy</h2>
          
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          
          <h2 className="page-subtitle">Contact Us</h2>
          
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <a href="mailto:tolu@lampstand.consulting" className="text-primary font-medium hover:underline">tolu@lampstand.consulting</a>
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
