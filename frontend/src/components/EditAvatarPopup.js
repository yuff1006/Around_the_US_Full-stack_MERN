import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useRef, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonState }) {
  const [isAvatarValid, setAvatarValid] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
    setAvatarValid(true);
  }, [isOpen, currentUser]);

  function checkAvatarInputValidity(event) {
    setAvatarValid(event.target.validity.valid);
    setValidationMessage(avatarRef.current.validationMessage);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Change Profile Picture"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonState === false ? "Save" : "Saving..."}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <input
        className={`popup__info ${
          isAvatarValid ? "" : "popup__info_type_error"
        }`}
        id="popup-profile-pic-url"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
        type="url"
        name="avatar"
        onChange={checkAvatarInputValidity}
        ref={avatarRef}
      />
      <span
        className={`popup__error ${
          isAvatarValid ? "" : "popup__error_visible"
        }`}
        id="popup-profile-pic-url-error"
      >
        {validationMessage}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
