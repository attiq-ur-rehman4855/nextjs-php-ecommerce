"use client";

import { Suspense } from "react";
import EditBrand from "./EditBrand";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBrand />
    </Suspense>
  );
}
