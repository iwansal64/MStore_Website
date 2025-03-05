import { Link, useSearchParams } from "react-router-dom";
import GoogleButton from "../components/googleLogin/googleLogin";
import { is_email_valid, manualSignUp, verifyRegistration } from "../api/student";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isProcess, setIsProcess] = useState(false);
  const [searchParams] = useSearchParams();

  //? Check for token (for validating account registration)
  const token = searchParams.get("token");

  async function signup() {
    setIsProcess(true);
    console.log("Manual SignUp!");

    try {
      const response = await manualSignUp({ email: email });
      if(response.success) {
        alert("Please open your gmail and confirm!");
        window.location.href = "/";
      }
      else if(response.error == "001") {
        setIsProcess(false);
        alert("There's someone that already registered with the same email");
      }
      else {
        setIsProcess(false);
        console.error(`Error: ${response.error}`);
        alert(`There's an unexpected error! Please contact developer.`);
      }
    }
    catch(error) {
      setIsProcess(false);
      console.error(`Error: ${response.error}`);
      alert(`Sorry, There's an unexpected error. Please contact developer.`);
    }
  }

  async function verify() {
    setIsProcess(true);
    console.log("Email Verification!");
    
    try {
      const response = await verifyRegistration({ token: token, fullname: fullname, password: password });
      if(response.success) {
        alert("Successfully sign up! Please log in!");
        window.location.href = "/";
      }
      else {
        setIsProcess(false);
        alert("There's a problem when trying to verify the account registration!");
      }
    }
    catch(error) {
      setIsProcess(false);
      console.error(error);
      alert("Sorry, There's an unexpected error. Please contact developer.");
    }
  }
  
  return (
    <>
      <div id="containerSignup" className="p-6 sm:w-1/2 w-full">
        <div id="title" className="flex flex-row justify-between">
          <div className="">
            <h1 className="font-bold tracking-wider text-2xl text-white">
              MitraStore
            </h1>
            <p className="text-white text-sm">Daftarkan akunmu disini!</p>
          </div>
          <img
            src="https://smkind-mm2100.sch.id/wp-content/uploads/2022/10/MM2100-LOGO-SMK-Mitra-Industri-MM2100-PNG.png"
            className="w-12 h-full shadow-md rounded-full"
          />
        </div>

        <div
          id="innerContainer"
          className=" flex flex-row justify-center items-center gap-8 sm:px-4 px-1 mt-8"
        >
          {/* Image */}
          <img src="/signup.png" className="w-1/2 mx-auto sm:block hidden" alt="" />
          {/* Form */}
          <div id="form" className="flex flex-col w-full">
            {(() => {
              //? If a client currently trying to register from an email confirmation
              if(token) {
                return <>
                    <div className="">
                      <input
                        type="text"
                        placeholder="Masukkan Nama Lengkap"
                        className="signUpInput placeholder:text-white px-4 py-3 rounded-lg my-4"
                        onChange={(event) => {
                          setFullname(event.target.value);
                        }}
                      />
                      <input
                        type="password"
                        placeholder="Masukkan Password"
                        className="signUpInput placeholder:text-white px-4 py-3 rounded-lg"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <button 
                        className="text-white w-full border border-white p-2 rounded-lg mt-8 hover:bg-white hover:text-black duration-300 uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none" 
                        onClick={verify}
                        disabled={isProcess}
                      >
                        Daftar
                      </button> 
                    </div>
                  </>
              }
              //? If the client just trying to sign up
              else {
                  return <>
                    <GoogleButton />
                    <div className="p-4">
                      <h1 className="text-center text-white">Atau</h1>
                    </div>
                    <div className="">
                      <input
                        type="email"
                        placeholder="Masukkan Emailmu"
                        className="signUpInput placeholder:text-white px-4 py-3 rounded-lg"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <button 
                        className="text-white w-full border border-white p-2 rounded-lg mt-8 hover:bg-white hover:text-black duration-300 uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none" 
                        onClick={signup}
                        disabled={!is_email_valid(email)||isProcess}
                      >
                        Daftar
                      </button> 
                    </div>
                  </>;
              }
            })()}
            <div className="text-white text-center mt-6">
              <p className="text-xs">
                Sudah memiliki akun MStore? <Link to="/" className="text-blue-400 hover:underline">Masuk</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
