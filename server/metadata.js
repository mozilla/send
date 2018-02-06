class Metadata {
  constructor(obj) {
    this.dl = +obj.dl || 0;
    this.dlimit = +obj.dlimit || 1;
    this.pwd = String(obj.pwd) === 'true';
    this.owner = obj.owner;
    this.metadata = obj.metadata;
    this.auth = obj.auth;
    this.nonce = obj.nonce;
  }
}

module.exports = Metadata;
