'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram,Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10  bottom-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">

        {/* Logo & Description */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold text-yellow-400">ShopSphere</h2>
          <p className="mt-2 text-sm text-gray-300">
            Your favorite destination for quality products. Fast delivery, secure checkout.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Useful Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-yellow-400">Products</Link></li>
            <li><Link href="/cart" className="hover:text-yellow-400">Cart</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Customer Support</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-yellow-400">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400"><Facebook /></a>
            <a href="#" className="hover:text-yellow-400"><Twitter /></a>
            <a href="#" className="hover:text-yellow-400"><Youtube /></a>
            <a href="#" className="hover:text-yellow-400"><Instagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopSphere. All rights reserved. |{" "}
        <Link href="/privacy" className="hover:text-yellow-400">Privacy Policy</Link>
      </div>
    </footer>
  );
}
 