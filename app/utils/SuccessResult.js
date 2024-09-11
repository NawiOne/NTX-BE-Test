class SuccessResult {
    static make(res) {
      this.res = res;
      return this;
    }
  
    static send(data, message) {
      return this.res.status(200).send(
        {
          statusCode: 200,
          message,
          success: true,
          data: data,
        },
      );
    }
  
  }
  
  module.exports = SuccessResult;
  