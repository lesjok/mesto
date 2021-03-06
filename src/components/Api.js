export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _errorHandler(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
     return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._errorHandler)
  }
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._errorHandler);
  }
  editUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    }).then(this._errorHandler); 
  }
  setLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._errorHandler);
  }
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }
  removeLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }
  changeUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
				avatar: item.avatar
      })
    })
    .then(this._errorHandler)
  }
}

