var keystone = require('keystone');
keystone.init({
  
  'name': 'Shane Gilroy Portfolio',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public', 'bower_components'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': 'mongodb://localhost/my-first-keystone',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'
  
});
 
require('./models');
 
keystone.set('routes', require('./routes'));
 
keystone.start();
