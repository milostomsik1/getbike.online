function Sanitize(field) {
  function _trim() {
    field = field.trim();
    return {
      ...this,
      sanitized: field
    };
  }

  return {
    trim: _trim,
  }
}

export default Sanitize;