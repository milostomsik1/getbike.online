function Sanitize(field) {
  function _trim() {
    field = field.trim();
    return {
      ...this,
      sanitized: field
    };
  }

  function _escape() {
    field = field.replace(/&/, '&amp;')
                 .replace(/>/, '&gt;')
                 .replace(/</, '&lt;')
                 .replace(/"/, '&quot;')
                 .replace(/'/, '&#39;');
    return {
      ...this,
      sanitized: field
    };
  }

  function _unescape() {
    field = field.replace(/&amp;/, `&`)
                 .replace(/&gt;/, `>`)
                 .replace(/&lt;/, `<`)
                 .replace(/&quot;/, `"`)
                 .replace(/&#39;/, `'`);
    return {
      ...this,
      sanitized: field
    };
  }

  function _blacklist(...characters) {
    const chars = `[${characters.join('')}]`;
    const re = new RegExp(chars, 'g');
    field = field.replace(re, '');
    return {
      ...this,
      sanitized: field
    };
  }

  return {
    trim: _trim,
    escape: _escape,
    unescape: _unescape,
    blacklist: _blacklist,
  }
}

export default Sanitize;