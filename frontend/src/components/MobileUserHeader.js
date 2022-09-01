import { useHistory } from "react-router-dom";

function MobileUserHeader({
  isLoggedIn,
  onPage,
  isActive,
  onLogOut,
  loggedInUser,
}) {
  const history = useHistory();
  const handleButtonClick = (evt) => {
    if (evt.target.value === "Log in") {
      history.push("/signin");
    } else if (evt.target.value === "Sign up") {
      history.push("/signup");
    } else if (evt.target.value === "Log out") {
      onLogOut();
    }
  };
  let buttonContent = "";
  if (isLoggedIn) {
    buttonContent = "Log out";
  } else if (!isLoggedIn && onPage === "login") {
    buttonContent = "Sign up";
  } else if (!isLoggedIn && onPage === "signup") {
    buttonContent = "Log in";
  }
  return (
    <div
      className={`header__credential-container header__credential-container_mobile ${
        isActive ? "header__credential-container_mobile_active" : ""
      }`}
    >
      {isLoggedIn && (
        <p className="header__account header__account_mobile">{loggedInUser}</p>
      )}
      <button
        type="button"
        className="header__button header__button_mobile"
        onClick={handleButtonClick}
        value={buttonContent}
      >
        {buttonContent}
      </button>
    </div>
  );
}

export default MobileUserHeader;
