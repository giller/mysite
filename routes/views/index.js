var keystone = require('keystone'),
    Posts = keystone.list('Post'),
    Projects = keystone.list('Project');



exports = module.exports = function(req, res) {
    var bothReady = false;
    var blog, project;

    Posts.model.find()
        .select('title createdAt brief')
        .where('state', 'published')
        .sort('-createdAt')
        .limit(1)
        .exec(function(err, posts) {
            blog = posts[0];

            Projects.model.find()
            .select('title brief githubUrl hostedUrl createdAt')
            .where('state', 'published')
            .where('title', 'My Personal Website')
            //.sort('-createdAt')
            .limit(1)
            .exec(function(err, posts){
                project = posts[0];
                    renderView(req, res, blog, project);
            });
        });

};

function renderView(req, res, blog, project){
    var view = new keystone.View(req, res);
    view.render('index', {
        blog: blog,
        project: project
    });
}
