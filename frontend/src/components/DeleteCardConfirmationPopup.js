import PopupWithForm from "./PopupWithForm";
import { DeletedCardContext } from "../contexts/DeletedCardContext";
import { useContext } from "react";
function DeleteCardConfirmationPopup({
  isOpen,
  onClose,
  onConfirmation,
  buttonState,
}) {
  const deletedCard = useContext(DeletedCardContext);
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmation(deletedCard);
  }
  return (
    <PopupWithForm
      name="delete-confirmation"
      title="Are you sure?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonState === false ? "Yes" : "Saving..."}
      onSubmit={handleSubmit}
      buttonState={buttonState}
    />
  );
}
export default DeleteCardConfirmationPopup;
