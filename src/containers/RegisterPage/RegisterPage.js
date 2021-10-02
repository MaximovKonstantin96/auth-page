import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../service/auth";
import NumberFormat from "react-number-format";
import "./RegisterPage.scss";
import { CloudDownloadOutlined } from "@material-ui/icons";

export const RegisterPage = ({ phone, setPhone, history, setIsLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [selectedFiles, setselectedFiles] = useState(null);
  const [error, setError] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.value);
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
        phone: "7" + phone,
        password: password,
        first_name: first_name,
        last_name: last_name,
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
            value={phone}
            required
          />
        </div>
        <div className="caston-input">
          <input
            className="registerFormInput password"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
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
            <CloudDownloadOutlined className="upload-image" />
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
