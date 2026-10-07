import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
      >
        <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
        Sign out
      </button>
    </form>
  );
}

export default SignOutButton;
