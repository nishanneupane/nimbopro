import { SignUp } from "@clerk/nextjs";
import { dark, shadesOfPurple } from '@clerk/themes'

export default function Page() {
  return <SignUp
    appearance={{
      baseTheme: dark
    }}
  />;
}