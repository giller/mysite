var keystone = require('keystone'),
    Posts = keystone.list('Post');

exports = module.exports = function(req, res) {
    var title = req.params.title;
    Posts.model.find()
        .where('title', title)
        .sort('-createdAt')
        .limit(1)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('singleBlog', { 
                model: posts
            });
        });
};
