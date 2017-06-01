const EventEmitter = require('events');

class UIWrapper extends EventEmitter {
  constructor(li, name, link, progress) {
    super();
    this.li = li;
    this.name = name;
    this.link = link;
    this.progress = progress;

    this.on("name", (filename) => {
      this.name.innerText = filename;
    });

    this.on("link", (link) => {
      this.link.innerText = link;
      this.link.setAttribute('href', link);
    });

    this.on("progress", (progress) => {
      this.progress.innerText = progress;
      
    });
  }
}

exports.UIWrapper = UIWrapper;