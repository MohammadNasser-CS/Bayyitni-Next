// src/app/sign-up/[[...rest]]/page.tsx

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <SignUp signInUrl="/sign-in" />
      </div>
    </>
  );
}
