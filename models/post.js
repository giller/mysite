var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Post.add({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: Types.LocalFile, 
        dest: '/data/files', 
        prefix: '/files/', 
        filename: function(item, file){
            return item.id + '.' + file.extension
        }
    }
});

Post.defaultColumns = 'title, createdAt';
Post.register();
