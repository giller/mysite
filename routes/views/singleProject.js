var keystone = require('keystone'),
    Projects = keystone.list('Project');

exports = module.exports = function(req, res) {
    var title = req.params.title;
    Projects.model.find()
        .where('title', title)
        .sort('-createdAt')
        .limit(1)
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            view.render('singleProject', { 
                model: posts
            });
        });
};
