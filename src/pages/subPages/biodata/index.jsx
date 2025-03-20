import { useEffect, useState } from "react";
import strftime from "strftime";
import { updateStudent } from "../../api/student";

const Biodata = () => {
  let is_login = true;
  const user_data = JSON.parse(localStorage.getItem("userData"));
  let user = {
    username: "Not sign in.",
    imgProfile: "/signup_profile.svg",
    coin: -1,
    angkatan: -1,
    born: "",
    gender: null
  };
  
  if(user_data) {
    user = {
      username: user_data.fullname,
      imgProfile: user_data.image_url,
      coin: user_data.balance,
      angkatan: user_data.generation,
      born: user_data.dateOfBirth,
      gender: user_data.gender
    };
  }
  else {
    is_login = false;
  }

  let default_born;
  let default_username;
  let default_gender;
  let default_angkatan;
  
  if(is_login) {
    default_born = user_data.date_of_birth ? user_data.date_of_birth.split("T")[0] : null;
    default_username = user.username;
    default_gender = user.gender !== null ? (user.gender == 1 ? "male" : "female") : "-";
    default_angkatan = user.angkatan;
  }

  const [changes, setChanges] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [born, setBorn] = useState(user_data ? new Date(user_data.date_of_birth) : new Date());
  const [gender, setGender] = useState(user.gender);
  const [angkatan, setAngkatan] = useState(user.angkatan);
  
  async function update_user_data() {
    const result = await updateStudent({ date_of_birth: born, gender: gender, generation: angkatan, username: username });
    if(result.success) {
      localStorage.removeItem("userData");
      window.location.reload();
    }
    else {
      console.error(result);
      alert("Sorry, There's an error when trying to update your data.");
    }
  }

  function update_user_input({ new_username, new_gender, new_generation, new_date_of_birth }) {
    if(new_username) setUsername(new_username);
    if(new_gender) setGender(new_gender == "male");
    if(new_generation) setAngkatan(new_generation);
    if(new_date_of_birth) setBorn(new Date(new_date_of_birth+"T01:01:01+00:00"));
  }

  useEffect(() => {
    if((username !== null && gender !== null && angkatan !== null && born !== null) && (user.username != username || user.angkatan != angkatan || user.born != born.toISOString() || user.gender != gender)) {
        setChanges(true);
    }
    else {
        setChanges(false)
    }
  }, [username, gender, angkatan, born]);

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
                src={user.imgProfile || "/avatar.svg"}
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
            
            {is_login?
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
                <tr><input class="bg-transparent" type="text" name="username" id="username" defaultValue={default_username} onChange={(event) => { update_user_input({new_username: event.target.value}); }} /></tr>
                <tr><input class="bg-transparent" type="date" name="born" id="born" defaultValue={default_born} onChange={(event) => { update_user_input({new_date_of_birth: event.target.value}); }} /></tr>
                <tr>
                  <select class="bg-transparent" name="gender" id="gender" defaultValue={default_gender} onChange={(event) => { update_user_input({new_gender: event.target.value}); }}>
                    <option class="bg-black" value="-">-</option>
                    <option class="bg-black" value="male">Male</option>
                    <option class="bg-black" value="female">Female</option>
                  </select>
                </tr>
                {/* <tr><input class="bg-transparent" type="text" name="angkatan" id="angkatan" defaultValue={default_angkatan} onChange={(event) => { update_user_input({new_generation: Number.parseInt(event.target.value)}); }} /></tr> */}
                <tr>
                  <select class="bg-transparent" name="angkatan" id="angkatan" defaultValue={default_angkatan} onChange={(event) => { update_user_input({new_generation: event.target.value}); }}>
                    <option value="-">-</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                  </select>
                </tr>
              </tbody>
            </table>
            <button className="mt-8 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" onClick={update_user_data} disabled={!changes}>Update</button>
            </div>:
            <><h1>You haven't sign in yet</h1></>}
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
                src={user.imgProfile || "/avatar.svg"}
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
                  <tr>{user.born ? strftime("%d %B %Y", new Date(user.born)) : "-"}</tr>
                  <tr>{user.gender !== null ? (user.gender == 1 ? "Male" : "Female" ) : "-"}</tr>
                  <tr>{user.angkatan || "-"}</tr>
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
