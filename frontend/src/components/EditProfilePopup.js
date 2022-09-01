import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonState }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNameValid, setNameValid] = useState(true);
  const [isAboutValid, setAboutValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameValid(true);
    } else {
      setNameValid(false);
      setValidationMessage(e.target.validationMessage);
    }
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.checkValidity()) {
      setAboutValid(true);
    } else {
      setAboutValid(false);
      setValidationMessage(e.target.validationMessage);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonState === false ? "Save" : "Saving..."}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <input
        type="text"
        className={`popup__info ${isNameValid ? "" : "popup__info_type_error"}`}
        id="popup-name"
        required
        minLength="2"
        maxLength="40"
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <span
        className={`popup__error ${isNameValid ? "" : "popup__error_visible"}`}
        id="popup-name-error"
      >
        {validationMessage}
      </span>
      <input
        type="text"
        className={`popup__info ${
          isAboutValid ? "" : "popup__info_type_error"
        }`}
        id="popup-title"
        required
        minLength="2"
        maxLength="200"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className={`popup__error ${isAboutValid ? "" : "popup__error_visible"}`}
        id="popup-title-error"
      >
        {validationMessage}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
