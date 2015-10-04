var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(req, res) {
    User.model.find()
        .exec(function(err, posts) {
            var view = new keystone.View(req, res);
            req.flash('info', 'Some information');
            view.render('index', {
                obj: posts 
            });
        });
};
