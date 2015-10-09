var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(req, res) {
    Posts = keystone.list('Post');
    Posts.model.find()
        .sort('-createdAt')
        .limit(1)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('projects', { 
                obj: posts
            });
        });
};