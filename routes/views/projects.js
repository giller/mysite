var keystone = require('keystone'),
    Project = keystone.list('Project');

exports = module.exports = function(req, res) {
    Project.model.find()
        .where('state', 'published')
        .select('title brief githubUrl hostedUrl createdAt')
        .sort('-createdAt')
        .limit(6)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('projects', { 
                model: posts
            });
        });
};
