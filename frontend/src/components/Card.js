import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "card__trash"
    : "card__trash card__trash_hidden";
  const isLiked = cardData.likes.some((user) => user._id === currentUser._id);
  const cardHeartButtonClassName = isLiked
    ? "card__heart card__heart_active"
    : "card__heart";
  function handleClick() {
    onCardClick(cardData);
  }
  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={onCardDelete}
        aria-label="Delete"
      />
      <img
        className="card__img"
        alt={cardData.name}
        src={cardData.link}
        onClick={handleClick}
      />
      <div className="card__handle">
        <h2 className="card__place">{cardData.name}</h2>
        <div className="card__like-container">
          <button
            aria-label="Like"
            type="button"
            className={cardHeartButtonClassName}
            onClick={onCardLike}
          />
          <p className="card__like-count">{cardData.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
