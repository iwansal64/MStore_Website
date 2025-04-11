'use client';
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "../components/loginComponents/googleLogin";
import LoginTrigger from "../components/loginComponents/loginTrigger";
import { SessionProvider, signIn } from "next-auth/react";
import { no_api } from "../../javascript/client_function";

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcess, setIsProcess] = useState(false);

  const handleLogin = async () => {
    //? Set process state to true
    setIsProcess(true);

    if(no_api()) {
        window.location.href = "/home";
    }
    else {
        //? Sign in to credentials manager from next-auth
        const result = await signIn("credentials", {
            username_or_email: usernameOrEmail,
            password: password,
            redirect: false,
        });
    
        //? If there's no error try to logging in and get token from server
        if(!result.error) {
          window.location.href = "/?login";
        }
        else {
          alert("Email/Username or password is wrong.");
        }
    }
    
    setIsProcess(false);
  };


  return (
    <>
      <SessionProvider>
        <LoginTrigger />
      </SessionProvider>
      <div id="containerLogin" className="w-full sm:w-1/2 p-6 ">
          <div id="title" className="flex flex-row justify-between">
          <div className="">
              <h1 className="font-bold tracking-wider text-2xl text-white">
              MitraStore
              </h1>
              <p className="text-white text-sm">Login dahulu ya!</p>
          </div>
          <img
              src="https://smkind-mm2100.sch.id/wp-content/uploads/2022/10/MM2100-LOGO-SMK-Mitra-Industri-MM2100-PNG.png"
              className="w-12 h-full shadow-md rounded-full"
          />
          </div>
          <div id="containerForm" className="mt-8">
          <form
              action=""
              className="flex flex-col items-start justify-center gap-4 text-white tracking-wide"
          >
              <label htmlFor="email" className="tracking-wider font-semibold">
              Email or Username :
              </label>
              <input
              type="text"
              placeholder="Masukkan Email/Username"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="loginInput outline-none px-4 py-3 w-full bg-white/10 backdrop-blur-md rounded-lg placeholder:text-white/60 "
              />

              <label htmlFor="password" className="tracking-wider font-semibold">
              Password :
              </label>
              <input
              type="password"
              placeholder="Masukkan Passwordmu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="loginInput outline-none px-4 py-3 w-full bg-white/10 backdrop-blur-md rounded-lg placeholder:text-white/60 "
              />
              <div
              id="btnAction"
              className="flex flex-row gap-4 items-center justify-center w-full"
              >
              <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full border border-white rounded-lg py-3 hover:bg-white hover:text-black duration-300 uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isProcess}
              >
                  Login
              </button>
              <GoogleButton />
              </div>
              <span className="mx-auto text-sm">
              Don`t have account?{" "}
              <Link to="/signUp" className="text-blue-400 hover:underline">
                  Sign Up Now!
              </Link>
              </span>
          </form>
          </div>
          <div className="w-full flex items-center justify-center mt-4">
            <button className="bg-white px-8 py-2 text-md rounded-xl text-black border-white border-2 duration-200 hover:bg-black hover:text-white" onClick={() => { (localStorage.getItem("development") ? localStorage.removeItem("development") : localStorage.setItem("development", "true")); window.location.reload(); }}>{localStorage.getItem("development") ? "Deactivate Development Mode" : "Activate Development Mode"}</button>
          </div>
      </div>
    </>
  );
};

export default LoginPage;
