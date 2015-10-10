var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res, next){
    res.notfound();
});

keystone.set('500', function(err, req, res, next) {
    var title, message;
    if(err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});

var routes = {
    views: importRoutes('./views')
};

exports = module.exports = function(app) {
    app.get('/', routes.views.index);
    app.get('/projects', routes.views.projects);
    app.get('/blog', routes.views.blog);
    app.get('/blog/:title', routes.views.singleBlog);
    app.get('/project/:title', routes.views.singleProject);
};
