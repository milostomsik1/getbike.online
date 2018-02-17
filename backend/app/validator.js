function Validate(field) {
  function _isNumber() {
    if (typeof field !== 'number') {
      throw new Error('Not a number.');
    }
    return this;
  }

  function _isEmail() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(field)) {
      throw new Error('Not an email.');
    }
    return this;
  }

  return {
    isNumber: _isNumber,
    isEmail: _isEmail,
  }
}

export default Validate;

// problem: can't chain async validators