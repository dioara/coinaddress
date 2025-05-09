"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

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
        <h1 className="page-title">Contact Us</h1>
        
        <div className="page-content">
          <p>
            Have questions, feedback, or need assistance with CoinAddress.io? We'd love to hear from you! 
            Fill out the form below and our team will get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We've received your message and will respond to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border-l-4 border-red-500">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-textarea"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="crypto-loading">Sending...</span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <div>
              <div className="crypto-card p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-1">Email</h3>
                  <a href="mailto:tolu@lampstand.consulting" className="text-primary hover:underline flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    tolu@lampstand.consulting
                  </a>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-1">Company</h3>
                  <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Lampstand Consulting Ltd
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Connect With Us</h3>
                  <p className="text-gray-600 mb-4">
                    Follow us on social media for updates, news, and cryptocurrency insights.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="crypto-note mt-8">
                <p className="font-semibold">Note:</p>
                <p>For urgent inquiries, please email us directly at <a href="mailto:tolu@lampstand.consulting" className="text-primary hover:underline">tolu@lampstand.consulting</a></p>
              </div>
            </div>
          </div>
          
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
