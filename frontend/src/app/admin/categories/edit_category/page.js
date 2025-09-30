"use client";

import { Suspense } from "react";
import EditCategory from "./EditCategory";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCategory />
    </Suspense>
  );
}
