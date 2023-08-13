const Article = require("./articles.model");

class ArticleService {
  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
  getUserArticles(userId) {
    return Article.find({ user: userId });
  }
  getUserArticlesWithUser(userId) {
    return Article.find({ user: userId })
      .populate({
        path: "user",
        select: "-password",
      });
  }
}

module.exports = new ArticleService();
