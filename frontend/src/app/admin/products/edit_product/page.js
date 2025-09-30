"use client";

import { Suspense } from "react";
import EditProduct from "./EditProduct";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProduct />
    </Suspense>
  );
}
