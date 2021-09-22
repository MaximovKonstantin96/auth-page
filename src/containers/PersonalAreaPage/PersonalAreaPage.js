import { NavLink } from "react-router-dom";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import "./PersonalAreaPage.scss";

export const PersonalAreaPage = ({
  history,
  isLoggedIn,
  setIsLoggedIn,
  userName,
}) => {
  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };
  console.log(userName);

  return (
    <div className="persPage">
      {isLoggedIn ? (
        <nav>
          <div className="helloBlock">
            <h1>Добро пожаловать, </h1> &nbsp;<strong>{userName}</strong>
          </div>
          <NavLink className="exitBtn" onClick={handleLogOut} exact to="/">
            <MeetingRoomIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        history.push("/")
      )}
    </div>
  );
};
