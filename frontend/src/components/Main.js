import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function Main({
  onEditAvatarClick,
  onAddPlaceClick,
  onEditProfileClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const [userInfo, setUserInfo] = useState({});

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

  useEffect(() => {
    setUserInfo({
      name: currentUser.name,
      about: currentUser.about,
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pic-container">
          <img
            alt={`${userInfo.name}'s headshot`}
            className="profile__pic"
            src={userInfo.avatar}
          />
          <button
            type="button"
            aria-label="Edit Profile Picture"
            className="profile__pic-edit"
            id="profile-pic-edit"
            onClick={onEditAvatarClick}
          />
        </div>
        <div className="profile__name-and-icon">
          <h1 className="profile__name">{userInfo.name}</h1>
          <button
            aria-label="Edit"
            type="button"
            className="profile__edit-icon"
            id="edit-icon"
            onClick={onEditProfileClick}
          />
        </div>
        <p className="profile__title">{userInfo.about}</p>
        <button
          aria-label="Add"
          type="button"
          className="profile__add-icon"
          id="add-icon"
          onClick={onAddPlaceClick}
        />
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card
              cardData={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={() => {
                onCardLike(card);
              }}
              onCardDelete={() => {
                onCardDelete(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
