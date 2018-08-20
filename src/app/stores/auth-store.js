import { observable, action } from 'mobx';
import request from 'app/utils/request';
import storage from 'app/utils/local-storage';
import logger from 'app/utils/logger';

class AuthStore {
  @observable
  refreshToken = '';
  @observable
  authToken = '';
  @observable
  userId = '';
  baseUrl = process.env.REACT_APP_API_BASE_URL || '';

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.refreshToken = storage.getItem('refreshToken') || '';
    this.authToken = storage.getItem('authToken') || '';
    this.userId = storage.getItem('userId') || '';

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
      this.authToken = resp.token;
      this.refreshToken = resp.refreshToken;
    });
  }

  @action
  fetchUserId() {
    this.makeAuthorizedRequest('/api/Account/id').then(resp => {
      this.userId = resp.userId;
    });
  }

  @action
  refresh() {
    if (!this.refreshToken) {
      logger.debug('Refresh token is not set. Ignoring refresh request');
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
