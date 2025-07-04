// app/(auth)/select-role/layout.tsx

import Image from "next/image";
import Link from "next/link";

export default function SelectRoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Top Nav */}

      <nav className="w-full px-4 py-3 shadow-sm bg-primary">
        <div className="max-w-5xl w-full mx-auto flex justify-between items-center">
          <Image
            src="images/branding/Bayyitni_logo_transparent_1.png" // Relative to the public folder
            alt="Bayyitni Logo"
            width={120}
            height={40}
          />
          <div>
            <span className="text-sm opacity-80 me-5">
              Already have an account?
            </span>
            <Link
              href="/"
              className="text-sm bg-secondary hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-10 rounded-lg transition duration-300"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Auth Page Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
