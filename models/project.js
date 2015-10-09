var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Project = new keystone.List('Project', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Project.add({
    title: { type: String, required: true },
    state: {type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    createdAt: { type: Date, default: Date.now, required: true },
    githubUrl: { type: String  },
    hostedUrl: { type: String },
    content: { type: Types.Html, wysiwyg: true, required: true, default: "<p>Content</p>" }
    //image: { type: Types.LocalFile, 
        //dest: 'data/files', 
        //prefix: '/files/', 
        //filename: function(item, file){
            //return file.originalname;// + '.' + file.extension
        //}
    //}
});

Project.defaultColumns = 'title, createdAt';
Project.register();
