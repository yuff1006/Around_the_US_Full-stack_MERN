class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  checkServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };
  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  _handleFetchResponse(path, methodUsed = 'GET', bodyContent = undefined) {
    return fetch(`${this._baseUrl}${path}`, {
      method: methodUsed,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: bodyContent,
    }).then(this.checkServerResponse);
  }
  getInitialCards() {
    return this._handleFetchResponse('/cards');
  }
  getUserInfo() {
    return this._handleFetchResponse('/users/me');
  }
  editUserProfile(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      about: inputValues.about,
    });
    return this._handleFetchResponse('/users/me', 'PATCH', bodyContent);
  }
  addNewCard(inputValues) {
    const bodyContent = JSON.stringify({
      name: inputValues.name,
      link: inputValues.link,
    });
    return this._handleFetchResponse('/cards', 'POST', bodyContent);
  }
  getCardLikeInfo() {
    return this._handleFetchResponse('/cards');
  }
  deleteCard(cardId) {
    return this._handleFetchResponse(`/cards/${cardId}`, 'DELETE');
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._handleFetchResponse(`/cards/${cardId}/likes`, 'DELETE');
    } else {
      return this._handleFetchResponse(`/cards/${cardId}/likes`, 'PUT');
    }
  }
  editProfilePic(avatarLink) {
    const bodyContent = JSON.stringify({
      avatar: avatarLink.avatar,
    });
    return this._handleFetchResponse('/users/me/avatar', 'PATCH', bodyContent);
  }
}
export const api = new Api({
  baseUrl: 'http://localhost:3000' || process.env.REACT_APP_DOMAIN_NAME,
});

export default Api;
