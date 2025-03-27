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
    born: new Date(),
    gender: null
  };
  
  if(user_data) {
    user = {
      username: user_data.fullname,
      imgProfile: user_data.image_url,
      coin: user_data.balance,
      angkatan: user_data.generation,
      born: user_data.date_of_birth ? (new Date(user_data.date_of_birth.split("T")[0])) : null,
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
  const [born, setBorn] = useState(user.born);
  const [gender, setGender] = useState(user.gender);
  const [angkatan, setAngkatan] = useState(user.angkatan);

  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to check the difference between the input and the previous data. If there's difference the user can press update button and if not, the user couldn't press the update button 
  function check_difference_input() {
    if((username !== null && gender !== null && angkatan !== null && born !== null) && (user.username != username || user.angkatan != angkatan || user.born.toISOString() != born.toISOString() || user.gender != gender)) {
        setChanges(true);
    }
    else {
        setChanges(false)
    }
  };
  
  // Function to update the user data based on the user input
  async function update_user_data() {
    // State that currently processing something to prevent accident spam from client
    setIsProcessing(true);

    // Give request to update the student data to the API
    const result = await updateStudent({ date_of_birth: born, gender: gender, generation: angkatan, username: username });
    if(result.success) {
      const new_user_data = result.result
      localStorage.setItem("userData", JSON.stringify(new_user_data));

      // Update to the newest data
      user = {
        username: new_user_data.fullname,
        imgProfile: new_user_data.image_url,
        coin: new_user_data.balance,
        angkatan: new_user_data.generation,
        born: new Date(new_user_data.date_of_birth),
        gender: new_user_data.gender
      };

      // Check difference again
      check_difference_input();
    }
    else {
      console.error(result);
      alert("Sorry, There's an error when trying to update your data.");
    }
    setIsProcessing(false);
  }

  // Function to synchronize the variables and the user input
  function update_user_input({ new_username, new_gender, new_generation, new_date_of_birth }) {
    if(new_username) setUsername(new_username);
    if(new_gender) setGender(new_gender == "male");
    if(new_generation) setAngkatan(new_generation);
    if(new_date_of_birth) setBorn(new Date(new_date_of_birth+"T01:01:01+00:00"));
  }

  // Watch for changes in username, gender, generation or date_of_birth
  useEffect(check_difference_input, [username, gender, angkatan, born]);


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
                <tr>
                    <td>Nama</td>
                </tr>
                <tr>
                    <td>Tanggal Lahir</td>
                </tr>
                <tr>
                    <td>Jenis Kelamin</td>
                </tr>
                <tr>
                    <td>Angkatan</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                    <td>
                        <input className="bg-transparent" type="text" name="username" id="username" defaultValue={default_username} onChange={(event) => { update_user_input({new_username: event.target.value}); }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input className="bg-transparent" type="date" name="born" id="born" defaultValue={default_born} onChange={(event) => { update_user_input({new_date_of_birth: event.target.value}); }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <select className="bg-transparent" name="gender" id="gender" defaultValue={default_gender} onChange={(event) => { update_user_input({new_gender: event.target.value}); }}>
                            <option className="bg-black" value="-">-</option>
                            <option className="bg-black" value="male">Male</option>
                            <option className="bg-black" value="female">Female</option>
                        </select>
                    </td>
                </tr>
                {/* <tr><input className="bg-transparent" type="text" name="angkatan" id="angkatan" defaultValue={default_angkatan} onChange={(event) => { update_user_input({new_generation: Number.parseInt(event.target.value)}); }} /></tr> */}
                <tr>
                    <td>
                        <select className="bg-transparent" name="angkatan" id="angkatan" defaultValue={default_angkatan} onChange={(event) => { update_user_input({new_generation: event.target.value}); }}>
                            <option value="-">-</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                        </select>
                    </td>
                </tr>
              </tbody>
            </table>
            <button className="mt-8 text-sm py-2 text-white w-full mx-auto border rounded-md hover:bg-white hover:text-black uppercase tracking-wide disabled:opacity-25 disabled:pointer-events-none" onClick={update_user_data} disabled={!changes || isProcessing}>Update</button>
            </div>:
            <><h1>You haven't sign in yet</h1></>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Biodata;
