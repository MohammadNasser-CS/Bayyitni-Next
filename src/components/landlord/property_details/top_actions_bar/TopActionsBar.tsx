// src/components/landlord/property_details/TopActionsBar.tsx
"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function TopActionsBar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Link
        href="/"
        className="flex items-center text-labels hover:text-secondary"
      >
        <ArrowLeftIcon className="h-4 w-4 me-2" />
        Back to Properties
      </Link>
    </div>
  );
}
