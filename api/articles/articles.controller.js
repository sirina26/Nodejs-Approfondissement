const articlesService = require("./articles.service");

class ArticlesController {
  async create(req, res, next) {
    try {
      const userId = req.user.userId;
      const articleData = { ...req.body, user: userId };
      
      const article = await articlesService.create(articleData);
      
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articlesService.update(id, data);

      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await articlesService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
