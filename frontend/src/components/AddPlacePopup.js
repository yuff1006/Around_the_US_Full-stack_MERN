import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, buttonState }) {
  const [pictureName, setPictureName] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [isNameValid, setNameValid] = useState(true);
  const [isLinkValid, setLinkValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  useEffect(() => {
    setPictureName("");
    setPictureLink("");
    setNameValid(true);
    setLinkValid(true);
  }, [isOpen]);
  function handlePictureNameChange(e) {
    setPictureName(e.target.value);
    if (e.target.checkValidity()) {
      setNameValid(true);
    } else {
      setNameValid(false);
      setValidationMessage(e.target.validationMessage);
    }
  }
  function handlePictureLinkChange(e) {
    setPictureLink(e.target.value);
    if (e.target.checkValidity()) {
      setLinkValid(true);
    } else {
      setLinkValid(false);
      setValidationMessage(e.target.validationMessage);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name: pictureName, link: pictureLink });
  }
  return (
    <PopupWithForm
      name="place"
      title="New place"
      buttonText={buttonState === false ? "Create" : "Saving..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    >
      <input
        type="text"
        className={`popup__info ${!isNameValid && "popup__info_type_error"}`}
        id="popup-place"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        name="name"
        value={pictureName}
        onChange={handlePictureNameChange}
      />
      <span
        className={`popup__error ${!isNameValid && "popup__error_visible"}`}
        id="popup-place-error"
      >
        {validationMessage}
      </span>
      <input
        className={`popup__info ${!isLinkValid && "popup__info_type_error"}`}
        id="popup-url"
        placeholder="Image Link"
        required
        type="url"
        name="link"
        value={pictureLink}
        onChange={handlePictureLinkChange}
      />
      <span
        className={`popup__error ${!isLinkValid && "popup__error_visible"}`}
        id="popup-url-error"
      >
        {validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
