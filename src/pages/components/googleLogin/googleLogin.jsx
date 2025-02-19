import { signIn } from "next-auth/react";

export default function GoogleButton() {
    
    return <button
      type="button"
      className="w-full px-3 py-3 rounded-lg bg-white text-black hover:bg-white/60 duration-300 flex flex-row items-center gap-4 justify-center"
      onClick={() => { signIn("google") }}
    >
      <img src="/googleLogo.svg" className="w-6" alt="" />
      Google
    </button>;
}