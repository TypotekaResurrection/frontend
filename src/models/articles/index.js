export class Article {
  constructor(
    title,
    count = 0,
    href = "#",
    categories = [],
    image = "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    time = new Date(),
    text = "Hi, this is an example text!"
  ) {
    this.title = title;
    this.count = count;
    this.href = href;
    this.categories = categories;
    this.image = image;
    this.time = time;
    this.text = text;
  }
}
