class Forbidden extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 403;
    this.message = message?? 'Forbidden';
  }
}

module.exports = Forbidden;
