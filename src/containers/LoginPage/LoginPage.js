import { useEffect, useState } from "react";
import "./LoginPage.scss";
import { authService } from "./../../service/auth/index";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

export const LoginPage = ({
  isRemember,
  setIsRemember,
  phone,
  setPhone,
  setIsLoggedIn,
  history,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsRemember = (e) => {
    setIsRemember(e.target.checked);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.login({
        phone: "7" + phone,
        password: password,
      });

      localStorage.setItem("token", data.token);
      isRemember && localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      history.push("/personal-area-page");
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

  useEffect(() => {
    const passFormData = window.localStorage.getItem("save-input-password");
    if (password === "") {
      setPassword(passFormData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("save-input-password", password);
  }, [password]);

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h1>Авторизация</h1>
        <div>
          <NumberFormat
            className="loginFormInput"
            format="+7 (###) ###-##-##"
            mask="_"
            inputmode="numeric"
            placeholder="Телефон"
            onValueChange={handlePhoneChange}
            value={phone}
            required
          />
        </div>
        <div className="caston-input">
          <input
            className="loginFormInput password"
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
        <div className="rememberRecover">
          <div className="remembersBlock">
            <input
              id="isRemember"
              className="isRemember"
              type="checkbox"
              onChange={handleIsRemember}
              checked={isRemember}
            />
            <label htmlFor="isRemember">Запомнить</label>
          </div>
          <Link to="/forgot-start" className="forgotStart">
            Забыли пароль?
          </Link>
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
        {error && <p>{error}</p>}
        <div className="regBlock">
          <span className="register"> У вас нет аккаунта?</span>
          <Link to="/register" className="signup">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </h1>
  );
};
