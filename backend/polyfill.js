if (!Array.prototype.random) {
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
}

if (!Array.prototype.first) {
  Array.prototype.first = function () {
    return this[0];
  };
}

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
      return letter.toUpperCase();
    });
  };
}
