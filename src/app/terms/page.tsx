import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className="page-title">Terms of Service</h1>
        
        <div className="page-content">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the 
            CoinAddress.io website operated by Lampstand Consulting Ltd.
          </p>
          
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with 
            these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree 
            with any part of the terms, you may not access the Service.
          </p>
          
          <h2 className="page-subtitle">Use of Service</h2>
          
          <p>
            CoinAddress.io is a cryptocurrency address verification tool designed to validate addresses, 
            decode their format, generate QR codes, and check basic information like balances where APIs 
            are available. The service is provided for informational and educational purposes only.
          </p>
          
          <p>
            You agree to use the Service only for lawful purposes and in a way that does not infringe the 
            rights of, restrict, or inhibit anyone else's use and enjoyment of the Service.
          </p>
          
          <h2 className="page-subtitle">No Financial Advice</h2>
          
          <p>
            The information provided by CoinAddress.io is for general informational purposes only. It is not 
            intended to be and does not constitute financial advice, investment advice, trading advice, or 
            any other advice.
          </p>
          
          <p>
            You should not make any decision, financial, investment, trading or otherwise, based on any of 
            the information presented on this site without undertaking independent due diligence and consultation 
            with a professional advisor.
          </p>
          
          <h2 className="page-subtitle">Accuracy of Information</h2>
          
          <p>
            While we strive to provide accurate information, CoinAddress.io makes no representations or 
            warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
            suitability, or availability of the information, products, services, or related graphics 
            contained on the website.
          </p>
          
          <p>
            Balance information and transaction data are retrieved from third-party blockchain explorers 
            and APIs. We cannot guarantee the accuracy of this information.
          </p>
          
          <h2 className="page-subtitle">Limitation of Liability</h2>
          
          <p>
            In no event shall CoinAddress.io or Lampstand Consulting Ltd be liable for any direct, indirect, 
            incidental, special, consequential, or punitive damages, including without limitation, loss of 
            profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6">
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
          
          <h2 className="page-subtitle">Intellectual Property</h2>
          
          <p>
            The Service and its original content, features, and functionality are and will remain the 
            exclusive property of Lampstand Consulting Ltd and its licensors. The Service is protected by 
            copyright, trademark, and other laws of both the United Kingdom and foreign countries.
          </p>
          
          <h2 className="page-subtitle">Links To Other Web Sites</h2>
          
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled 
            by CoinAddress.io or Lampstand Consulting Ltd.
          </p>
          
          <p>
            CoinAddress.io has no control over, and assumes no responsibility for, the content, privacy policies, 
            or practices of any third-party websites or services. You further acknowledge and agree that 
            CoinAddress.io shall not be responsible or liable, directly or indirectly, for any damage or loss 
            caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
            goods, or services available on or through any such websites or services.
          </p>
          
          <h2 className="page-subtitle">Changes</h2>
          
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
            revision is material, we will try to provide at least 30 days' notice prior to any new terms 
            taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2 className="page-subtitle">Contact Us</h2>
          
          <p>
            If you have any questions about these Terms, please contact us at:
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
