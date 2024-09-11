class InvalidData extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 422;
    this.message = 'Invalid Input Data! ' + message? 'Error: ' + message: '';
  }
}

module.exports = InvalidData;
