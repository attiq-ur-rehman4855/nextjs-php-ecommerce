"use client";

import { Suspense } from "react";
import SearchPage from "./SearchProduct";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
