var keystone = require('keystone'),
    Project = keystone.list('Project');

exports = module.exports = function(req, res) {
    Project.model.find()
        .sort('-createdAt')
        .limit(5)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('projects', { 
                model: posts
            });
        });
};
