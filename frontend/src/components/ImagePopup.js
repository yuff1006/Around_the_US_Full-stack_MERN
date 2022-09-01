function ImagePopup({ name, isOpen, onClose, card }) {
  function handleOverLayClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}
      onClick={handleOverLayClose}
    >
      <div className="popup__close-and-picture">
        <img alt={card.name} src={card.link} className="popup__picture" />
        <button
          aria-label="Close"
          type="button"
          className="popup__close popup__close_picture"
        />
        <h2 className="popup__popup-caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
