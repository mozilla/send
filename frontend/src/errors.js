class Extendable extends Error {
  constructor(err) {
    super();
    this.message = err; 
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}    

class IntegrityError extends Extendable {
  constructor(err) {
    super(err);
  }
}



module.exports = {
  IntegrityError: IntegrityError
};