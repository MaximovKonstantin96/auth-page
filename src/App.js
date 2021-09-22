import { useEffect, useState } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { PersonalAreaPage } from "./containers/PersonalAreaPage/PersonalAreaPage";
import { ForgotEndPage } from "./containers/RecoveryPage/ForgotEndPage";
import { ForgotStartPage } from "./containers/RecoveryPage/ForgotStartPage";
import { RegisterPage } from "./containers/RegisterPage/RegisterPage";
import { userService } from "./service/user/index";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  console.log("isLoggedIn", isLoggedIn);

  // const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [disBtn, setDisBtn] = useState(false);

  useEffect(() => {
    return () => {
      if (isRemember === "false") {
        localStorage.removeItem("token");
      }
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await userService.getUserDetail();
        setUser(data);
      } catch (error) {
        console.warn(error);
      }
    };
    load();
  }, [isLoggedIn]);

  useEffect(() => {
    const phoneFormData = window.localStorage.getItem("save-input-phone");
    if (phone === "") {
      setPhone(phoneFormData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("save-input-phone", phone);
  }, [phone]);

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LoginPage
                  {...props}
                  phone={phone}
                  setPhone={setPhone}
                  setIsLoggedIn={setIsLoggedIn}
                  isRemember={isRemember}
                  setIsRemember={setIsRemember}
                />
              )}
            />
            <Route
              exact
              path="/forgot-start"
              render={(props) => (
                <ForgotStartPage
                  {...props}
                  phone={phone}
                  setPhone={setPhone}
                  disBtn={disBtn}
                  setDisBtn={setDisBtn}
                />
              )}
            />
            <Route
              exact
              path="/forgot-end"
              render={(props) => (
                <ForgotEndPage {...props} phone={phone} setPhone={setPhone} />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <RegisterPage {...props} phone={phone} setPhone={setPhone} />
              )}
            />
            <Route
              exact
              path="/personal-area-page"
              render={(props) => (
                <PersonalAreaPage
                  {...props}
                  userName={user?.first_name}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            />
          </Switch>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
