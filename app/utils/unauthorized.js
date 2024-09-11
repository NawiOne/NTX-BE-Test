class Unauthorized extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 401;
    this.message = message ?? 'Unauthorized';
  }
}

module.exports = Unauthorized;
