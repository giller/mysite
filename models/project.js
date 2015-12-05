var keystone = require('keystone'),
    Types = keystone.Field.Types,
    config = require('../lib/config');

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
    brief: {type: String, required: true, default: "A really good project"},
    content: { type: Types.Html, required: true, default: "<p>Content</p>" }
    //image: { type: Types.LocalFile, 
        //dest: 'data/files', 
        //prefix: '/files/', 
        //filename: function(item, file){
            //return file.originalname;// + '.' + file.extension
        //}
    //}
});

Project.schema.pre('save', function(next){
    //if content was modified update brief
    config.latestUpdate = new Date();
    next();
});

Project.defaultColumns = 'title, createdAt';
Project.register();
