var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Post.add({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    content: { type: Types.Html, wysiwyg: true, required: true, default: "<p>Content</p>" },
    image: { type: Types.LocalFile, 
        dest: 'data/files', 
        prefix: '/files/', 
        filename: function(item, file){
            return file.originalname;// + '.' + file.extension
        }
    }
});

Post.defaultColumns = 'title, createdAt';
Post.register();
