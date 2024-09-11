class DataNotFound extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 404;
    this.message = message || 'Data not found!';
  }
}

module.exports = DataNotFound;
