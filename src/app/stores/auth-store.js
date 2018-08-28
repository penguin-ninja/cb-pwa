import { observable, action } from 'mobx';
import request from 'app/utils/request';
import storage from 'app/utils/local-storage';
import logger from 'app/utils/logger';

// @TODO handle API errors
class AuthStore {
  @observable
  refreshToken = '';
  @observable
  authToken = '';
  @observable
  userId = '';
  @observable
  isLoaded = false;
  baseUrl = process.env.REACT_APP_API_BASE_URL || '';
  plantId = 3; // hard coded as 3 for now

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.refreshToken = storage.getItem('refreshToken') || '';
    this.authToken = storage.getItem('authToken') || '';
    this.userId = storage.getItem('userId') || '';

    // TODO update this process to get auth token from other page
    this.login(username, password)
      .then(() => this.fetchUserId())
      .then(() => {
        this.isLoaded = true;
      });
    // this.refresh();
  }

  @action
  login(username, password) {
    return this.makeRequest(
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
    return this.makeAuthorizedRequest('/api/Account/id').then(resp => {
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

  makeRequest(url, params, method, headers) {
    if (!navigator.onLine && (!method || method === 'GET')) {
      logger.warn(`You are offline. Serving from local storage for ${url}`);
      return Promise.resolve(storage.getItem(url));
    }

    return request(`${this.baseUrl}${url}`, params, method, headers).then(
      resp => {
        if (!method || method === 'GET') {
          logger.debug(`Storing info for ${url}`);
          storage.setItem(url, resp);
        }

        return resp;
      }
    );
  }
}

export default AuthStore;
