import { useState } from "react";
import { authService } from "../../service/auth/index";

export const ForgotEndPage = ({ phone, history }) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.forgotEnd({
        code,
        password,
        phone: "7" + phone,
      });

      localStorage.setItem("token", data.token);

      history.push("/personal-area-page");
    } catch (error) {
      console.warn(error.response);
    }
  };

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Восстановление пароля</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Код из смс"
            onChange={handleCodeChange}
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Новый пароль"
            onChange={handleNewPassword}
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
