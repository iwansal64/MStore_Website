import { Link } from "react-router-dom";
import GoogleButton from "../components/googleLogin/googleLogin";
import { is_email_valid, manualSignUp } from "../api/student";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");

  async function signup() {
    console.log("Manual SignUp!");

    try {
      const response = await manualSignUp({ email: email });
      console.log(response);
      if(response.success) {
        alert("Please open your gmail and confirm!");
      }
      else {
        console.error(`Error: ${response.error}`);
        alert(`There's an unexpected error! Please contact developer.`);
      }
    }
    catch(error) {
      console.error(`Error: ${response.error}`);
      alert(`There's an unexpected error. Please contact developer.`);
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
            <GoogleButton />
            <div className="p-4">
              <h1 className="text-center text-white">Atau</h1>
            </div>
            <form action="" className="">
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
                disabled={!is_email_valid(email)}
              >
                Daftar
              </button> 
            </form>
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
