import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip({ name, isOpen, success, onClose }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={success ? successImage : failImage}
          alt={success ? "success" : "fail"}
          className="popup__icon"
        />
        <h2 className="popup__message">
          {success
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
        <button
          aria-label="Close"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
