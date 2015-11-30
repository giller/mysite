var keystone = require('keystone'),
    Posts = keystone.list('Post'),
    Projects = keystone.list('Project'),
    async = require('async');



exports = module.exports = function(req, res) {
    var blog, project;

    async.parallel(
    [
        function(callback){
            Projects.model.find()
            .select('title brief githubUrl hostedUrl createdAt')
            .where('state', 'published')
            .where('title', 'My Personal Website')
            .limit(1)
            .exec(function(err, posts){
                project = posts[0];
                callback();
            });

        },
        function(callback){
            Posts.model.find()
            .select('title createdAt brief')
            .where('state', 'published')
            .limit(1)
            .exec(function(err, posts) {
                blog = posts[0];
                callback();
            });
        }
    ], function(err, results){
        renderView(req, res, blog, project);
    });

};

function renderView(req, res, blog, project){
    var view = new keystone.View(req, res);
    view.render('index', {
        blog: blog,
        project: project
    });
}
