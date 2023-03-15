export class Comment {
  constructor(name, body, href, date = Date()) {
    this.name = name;
    this.body = body;
    this.href = href;
    this.date = date;
  }
}
