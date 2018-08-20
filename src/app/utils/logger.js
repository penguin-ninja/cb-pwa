// @TODO implement 3rd party logging service or lib

class Logger {
  error(...args) {
    console.error(...args);
  }

  warn(...args) {
    console.warn(...args);
  }

  info(...args) {
    console.info(...args);
  }

  debug(...args) {
    console.debug(...args);
  }

  log(...args) {
    console.log(...args);
  }
}

const logger = new Logger();
window.CONCRETE_LOGGER = logger;

export default logger;
