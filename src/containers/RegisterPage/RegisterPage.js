import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../service/auth";
import NumberFormat from "react-number-format";
import "./RegisterPage.scss";

export const RegisterPage = ({ history, setIsLoggedIn }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [selectedFiles, setselectedFiles] = useState(null);
  const [error, setError] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.register({
        phone,
        password,
        first_name,
        last_name,
      });

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      history.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const toogleType = () => {
    let input = document.querySelector(".password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const fileSelectedHandler = (event) => {
    setselectedFiles(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    try {
      const data = await authService.changeAva({
        selectedFiles,
      });
      localStorage.setItem("token", data.token);
      console.log("adadad");
    } catch (error) {
      setError(error.response);
    }
  };

  // function fileUploadHandler(file) {
  //   if (file.type && !file.type.startsWith("image/")) {
  //     console.log("File is not an image.", file.type, file);
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.addEventListener("load", (event) => {
  //     img.src = event.target.result;
  //   });
  //   reader.readAsDataURL(file);
  // }

  return (
    <h1>
      <form className="registerForm" onSubmit={handleLogIn}>
        <h1>Регистрация</h1>
        <div>
          <NumberFormat
            className="registerFormInput"
            placeholder="Телефон"
            format="+7 (###) ###-##-##"
            mask="_"
            inputmode="numeric"
            onValueChange={handlePhoneChange}
            required
          />
        </div>
        <div className="caston-input">
          <input
            className="registerFormInput password"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            required
          />
          <label className="showPassword">
            <span>
              <i className="fas fa-eye" onClick={toogleType}></i>
            </span>
          </label>
        </div>
        <div>
          <input
            className="registerFormInput"
            type="text"
            placeholder="Имя"
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <input
            className="registerFormInput"
            type="text"
            placeholder="Фамилия"
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="downloadBlock">
          <label htmlFor="upload-photo">
            <img
              className="upload-image"
              src="https://yandex-images.clstorage.net/XEI5T1218/4bc9af2fn/iog9c9nAslSKVhr1QnM4K5cbx_WwKTiIS_IXd2t0LJU4AhyHeXivzk_FNI8TP2KUuGlA8K6cwQiVxYm0rtsTjteRfEbprMtoolIa-XZXVA-LN-fJkDlolEKTSxorWGC4bSsF-3jdMgeCCcA_1vq6NAQUFZyrxLlt3MlsAJtezn9uMNGHyewXRKYuTy2eMyAj606XwZBkQBWDkj4OE_AZgGVfXMaEYQ6zNjH8t5Y2vpyIvD28H0hAyeh9VPkj3r5nUgi9hxlM56QK9gcFnuNkL2O-x60sRJTtu05CsgPQRci118y-nKWq195NEOMWOjr4JDzNKCtYsE2sncCdX96eUxLoaTsNQF94AhJfaQr7xCdDojOV9FTYtRMSgurz5AUYSRtcsnQ1Gq_GGbRPtm5qqBz8vRhnTGTZ0AmwpcNKivfSBI2nWTTfzP4iB5Huf4gfp36zgUw4UKEHhiqqY1TpPEGLjIKs-eKfQjEAUy4SdrgoULEgMzRkEZDhIOULuno_MmCdl7msJ_z6dgeJEnsEi2eqJ4E0QLwd0xZGzrPgBUApE3yGpD2q69rl1Bt2di6giEBZjAeY-MWYKXg9B-ZGu2r0mSsRMOOsVuJbefprjL8rpsvtCHy84ZuyAqZ3oDFIuYOYipB9DpMqPSiTAjqOwAQoVRifwACFwHG88bMe5heSRAUX2eDjoLr60-WOQ7Dja_YrxRj8MM3XDhZag0QJcJ2LpLog_UqLUtFosypSwpQg3CngM8B0gfQNnJm3Ku5HAoydEzkEU0ySJssJxiM4UyeSz0HMpFRxfxpaVn9ANQQlkxDWeEHS24KZkLv6fsZAtExJMK8cCN10pbh5y4Jew05MXcN5RFtArmKD9U6nNAsLkuMVDKwQgd-OyrZziGnYtUNcTmytUpvSTazfKnJ2KFzkuYQHHIydoEnINf_mdj_SgBGPORxrTCYuH1EO_7C3HxrTZbhAjGlXjqbWN3Qc"
            ></img>
          </label>
          <input
            type="file"
            name="photo"
            id="upload-photo"
            onChange={fileSelectedHandler}
          />
          <button
            className="download-btn"
            //  onClick={fileUploadHandler}
          >
            Загрузить аватар
          </button>
        </div>
        {error && <p>{error}</p>}

        <div>
          <button className="regBtn" type="submit">
            Войти
          </button>
        </div>
        <div className="regBlock">
          <span className="register"> У вас уже есть аккаунт?</span>
          <Link to="/" className="loginRegForm">
            Авторизация
          </Link>
        </div>
      </form>
    </h1>
  );
};
