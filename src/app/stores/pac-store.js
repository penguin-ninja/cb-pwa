import request from 'app/utils/request';

class PacStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  get baseUrl() {
    return 'http://localhost:9000';
  }

  run(command) {
    return request(`${this.baseUrl}/run`, {
      command
    }).then(resp => {
      const result = {};
      const texts = (resp.result || '').split('\r\n');

      texts.forEach(text => {
        const rgx = /^([\w]+)\s(.+)$/gi;
        const match = rgx.exec(text);
        if (match) {
          result[match[1]] = match[2];
        }
      });

      return result;
    });
  }
}

export default PacStore;
