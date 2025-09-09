"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">ShopSphere</span>, we value your
          trust and are committed to protecting your personal information. This
          Privacy Policy explains how we collect, use, and safeguard your data
          when you use our website and services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            Personal details such as your name, email address, phone number, and
            delivery address when you create an account or place an order.
          </li>
          <li>
            Login information stored in session (only for authentication
            purposes).
          </li>
          <li>
            Details you provide when contacting us through the Contact Us form.
          </li>
          <li>
            Technical data such as your IP address, browser type, and cookies to
            improve user experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>To process your orders and deliver products.</li>
          <li>To provide account management and authentication.</li>
          <li>To respond to your queries and messages.</li>
          <li>
            To improve our website’s functionality and customer experience.
          </li>
          <li>To send you important updates about your orders or account.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
        <p className="text-gray-600 mb-4">
          We do not sell or trade your personal data. However, we may share your
          information with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Delivery partners to ship your orders.</li>
          <li>Payment gateways to process transactions securely.</li>
          <li>Legal authorities if required by law.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We use SSL encryption, secure databases, and restricted access to
          protect your personal information. However, please note that no method
          of online transmission is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
        <p className="text-gray-600 mb-4">
          Our website uses cookies to remember your preferences and improve your
          shopping experience. You may disable cookies in your browser settings,
          but some features may not function properly.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>You can update or delete your account information anytime.</li>
          <li>You can contact us to request removal of your stored data.</li>
          <li>You can unsubscribe from promotional emails anytime.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about our Privacy Policy, please contact us
          at:
        </p>
        <p className="text-gray-600">
          📧 <span className="font-medium">support@shopsphere.com</span> <br />
          📞 <span className="font-medium">+1 (555) 123-4567</span>
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
