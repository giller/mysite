var keystone = require('keystone'),
    Posts = keystone.list('Post');

exports = module.exports = function(req, res) {
    Posts.model.find()
        .where('state', 'published')
        .select('createdAt brief title')
        .sort('-createdAt')
        .limit(10)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('blog', { 
                obj: posts
            });
        });
};
