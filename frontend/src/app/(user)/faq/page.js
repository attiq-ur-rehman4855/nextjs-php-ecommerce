"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Our standard delivery usually takes 3-5 working days, depending on your location and the product availability.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "Currently, we support Cash on Delivery (COD) and Bank Transfer. More payment options will be added soon.",
    },
    {
      question: "Do your products come with a guarantee?",
      answer:
        "Yes, we ensure all our products are of high quality. If there is a manufacturing defect, you can contact our support team.",
    },
    {
      question: "Are there any shipping charges?",
      answer:
        "Shipping is free on all orders above a certain amount. For smaller orders, minimal delivery charges may apply.",
    },
    {
      question: "Do I need an account to place an order?",
      answer:
        "Yes, you need to sign up for an account to place an order. This helps you track your purchases and manage your profile easily.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-50 focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="ml-2">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
