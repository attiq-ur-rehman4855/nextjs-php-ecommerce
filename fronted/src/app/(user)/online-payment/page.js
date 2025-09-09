"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate successful payment
    setTimeout(() => {
      // redirect to thank you page after success
      router.push("/thank-you");
    }, 3000); // simulate 3-second delay for payment
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we complete your payment.</p>
      </div>
    </div>
  );
}
