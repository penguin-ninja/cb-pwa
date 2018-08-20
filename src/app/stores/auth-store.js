import { observable, action } from 'mobx';
import request from 'app/utils/request';

class AuthStore {
  @observable
  refreshToken = '';
  @observable
  authToken = '';
  @observable
  userId = '';
  baseUrl = process.env.API_BASE_URL;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.refreshToken = CONCRETE_LOGGER.get('refreshToken') || '';
    this.authToken = CONCRETE_LOGGER.get('authToken') || '';
    this.userId = CONCRETE_LOGGER.get('userId') || '';

    this.refresh();
  }

  @action
  login(username, password) {
    this.makeRequest(
      '/api/Authentication',
      {
        login: username,
        password
      },
      'POST'
    ).then(resp => {
      // @TODO handle login
    });
  }

  @action
  fetchUserId() {
    this.makeAuthorizedRequest('/api/Account/id').then(resp => {
      // @TODO handle user id
    });
  }

  @action
  refresh() {
    if (!this.refreshToken) {
      CONCRETE_LOGGER.debug(
        'Refresh token is not set. Ignoring refresh request'
      );
      return;
    }

    return this.makeRequest(
      '/api/Authentication/refresh',
      {
        userId: this.userId,
        refreshToken: this.refreshToken
      },
      'POST'
    ).then(resp => {
      // @TODO refresh token
    });
  }

  makeAuthorizedRequest(url, params, method) {
    if (!this.authToken) {
      return Promise.reject('Auth Token is not set');
    }

    return this.makeRequest(url, params, method, {
      Authorization: `Bearer ${this.authToken}`
    });
  }

  makeRequest(url, params, method) {
    return request(`${this.baseUrl}${url}`, params, method);
  }
}

export default AuthStore;
