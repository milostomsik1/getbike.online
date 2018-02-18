const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 32;

function Validate(field) {
  function _isNumber() {
    if (typeof field !== 'number') {
      throw new Error('Not a number.');
    }
    return this;
  }

  function _isString() {
    if (typeof field !== 'string') {
      throw new Error('Not a string.');
    }
    return this;
  }

  function _isBoolean() {
    if (typeof field !== 'boolean') {
      throw new Error('Not a boolean.');
    }
    return this;
  }

  function _isEmpty() {
    if (field === '') {
      throw new Error('Is empty.');
    }
    return this;
  }

  function _isEmail() {
    if (!EMAIL_REGEX.test(field)) {
      throw new Error('Not an valid email.');
    }
    return this;
  }

  function _isURL() {
    if (!URL_REGEX.test(field)) {
      throw new Error('Not a valid url.');
    }
    return this;
  }

  function _isPassword() {
    if (field.length < PASSWORD_MIN_LENGTH) {
      throw new Error(`Password must be longer than ${PASSWORD_MIN_LENGTH} characters.`);
    } else if (field.length > PASSWORD_MAX_LENGTH) {
      throw new Error(`Password must be shorter than ${PASSWORD_MAX_LENGTH} characters.`);
    }
    return this;
  }


  return {
    isEmpty: _isEmpty,
    isNumber: _isNumber,
    isString: _isString,
    isBoolean: _isBoolean,
    isEmail: _isEmail,
    isURL: _isURL,
    isPassword: _isPassword,
  }
}

export default Validate;

// problem: can't chain async validators