var keystone = require('keystone'),
    config = require('./lib/config');

keystone.init({
  
  'name': 'Shane\'s Portfolio',
  
  'favicon': 'public/favicon.ico',
  //'less': 'public',
  'static': ['public', 'bower_components'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': config.connectionString,
  
  'logger': 'common',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': config.secret
  
});
 
require('./models');
 
keystone.set('routes', require('./routes'));
 
keystone.start();
