import { authService } from "./../../service/auth/index";
import NumberFormat from "react-number-format";

export const ForgotStartPage = ({
  disBtn,
  setDisBtn,
  phone,
  setPhone,
  history,
}) => {
  const handlePhoneChange = (e) => {
    setPhone(e.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log("disBtn", disBtn);
    setDisBtn(true);
    setTimeout(() => (setDisBtn(false), 20000));
    // await new Promise((resolve) =>
    //   setTimeout(() => {
    //     console.log("Отправили на телефон смс");
    //     resolve();
    //   }, 3000)
    // );
    setDisBtn(true);
    try {
      const data = await authService.forgotStart({
        phone: "7" + phone,
      });

      localStorage.setItem("token", data.token);
      history.push("/forgot-end");
    } catch (error) {
      console.warn(error.response);
    }
  };

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Восстановление пароля</h2>
        <div>
          <NumberFormat
            className="loginFormInput"
            format="+7 (###) ###-##-##"
            mask="_"
            inputmode="numeric"
            placeholder="Телефон"
            value={phone}
            onValueChange={handlePhoneChange}
          />
        </div>
        <div>
          <button className="blackBtn" type="submit" disabled={disBtn}>
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
