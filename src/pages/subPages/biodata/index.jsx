import { useEffect, useState } from "react";

const Biodata = () => {
  const [user, setUser] = useState({
    imgProfile: "/signup_profile.svg",
    username: "",
    born: "",
    gender: "",
    angkatan: 0,
    coin: -1,
  });

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(userData) {
      setUser({
        username: userData.username,
        imgProfile: "/avatar.svg",
        coin: userData.balance,
        angkatan: 12,
        born: "21 January 2020",
        gender: "Laki-laki"
      });
    }
    else {
      setUser({
        username: "Not sign in.",
        imgProfile: "/signup_profile.svg",
        coin: -1,
        angkatan: -1,
        born: "",
        gender: ""
      });
    }
  }, []);
  return (
    <>
      <section id="desktopView">
        <div className="sm:block hidden">
          <div className="flex flex-row gap-8 mx-4 p-5 ">
            <div
              id="containerImage"
              className="rounded-lg shadow-inner shadow-zinc-600 p-4 w-1/4 h-fit"
            >
              {/* Image */}
              <img
                src={user.imgProfile}
                className="aspect-square w-full h-full mx-auto object-contain rounded-lg p-4"
                alt=""
              />
              {/* Button Change Picture */}
              <button className="text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide">
                Change Picture
              </button>
              {/* Subtitle Card */}
              <div id="subtitle">
                <p className="text-sm text-white/80 py-4">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi
                  file yang diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            {/* Information Data */}
            <div id="title">
              <h1 className="text-white/80 text-2xl">Ubah Biodata Diri</h1>
              <table className="text-white flex flex-row justify-center items-center gap-10 mt-4">
                <tbody>
                  <tr>Nama</tr>
                  <tr>Tanggal Lahir</tr>
                  <tr>Jenis Kelamin</tr>
                  <tr>Angkatan</tr>
                </tbody>
                <tbody>
                  <tr>{user.username}</tr>
                  <tr>{user.born}</tr>
                  <tr>{user.gender}</tr>
                  <tr>{user.angkatan}</tr>
                </tbody>
                <tbody>
                  <tr>
                    <button className="text-white/70 hover:text-white">
                      Change
                    </button>
                  </tr>
                  <tr>
                    <button className="text-white/70 hover:text-white">
                      Change
                    </button>
                  </tr>
                  <tr>
                    <button className="text-white/70 hover:text-white">
                      Change
                    </button>
                  </tr>
                  <tr>
                    <button className="text-white/70 hover:text-white">
                      Change
                    </button>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="mobileViews">
        <div className="block sm:hidden">
        <div className="flex flex-col gap-8 mx-4 p-5 ">
            <div
              id="containerImage"
              className="rounded-lg shadow-inner shadow-zinc-600 p-4 w-full h-fit"
            >
              {/* Image */}
              <img
                src={user.imgProfile}
                className="aspect-square w-full h-full mx-auto object-contain rounded-lg p-4"
                alt=""
              />
              {/* Button Change Picture */}
              <button className="text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide">
                Change Picture
              </button>
              {/* Subtitle Card */}
              <div id="subtitle">
                <p className="text-sm text-white/80 py-4">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi
                  file yang diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            {/* Information Data */}
            {}
            <div id="title">
              <h1 className="text-white/80 text-2xl">Ubah Biodata Diri</h1>
              <table className="text-white flex flex-row justify-center items-center gap-10 mt-4">
                <tbody>
                  <tr>Nama</tr>
                  <tr>Tanggal Lahir</tr>
                  <tr>Jenis Kelamin</tr>
                  <tr>Angkatan</tr>
                </tbody>
                <tbody>
                  <tr>{user.username}</tr>
                  <tr>{user.born}</tr>
                  <tr>{user.gender}</tr>
                  <tr>{user.angkatan}</tr>
                </tbody>
                <tbody>
 
 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Biodata;
