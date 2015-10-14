var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Post.add({
    title: { type: String, required: true },
    state: {type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    createdAt: { type: Date, default: Date.now, required: true },
    editedAt: { type: Date },
    brief: { type: String },
    content: { type: Types.Html, required: true, default: "<p>Content</p>" }
    //image: { type: Types.LocalFile, 
        //dest: 'data/files', 
        //prefix: '/files/', 
        //filename: function(item, file){
            //return file.originalname;// + '.' + file.extension
        //}
    //}
});

Post.schema.pre('save', function(next){
    //if content was modified update brief
    if(this.$__.activePaths.paths.content == "modify"){
        var content = this._doc.content;
        if(content.length > 100){
            content = content.substring(0, 100);
        }
        //the following hack manually sets the brief field to modified
        //all fields are marked as "init" or "modify" in various ways and in
        //various arrays
        //change "init" to "modify"
        this.$__.activePaths.paths.brief = "modify";
        //remove brief from the init array
        delete this.$__.activePaths.states.init.brief;
        //add it back into the modify array
        this.$__.activePaths.states.modify.brief = true;
        //remove HTML elements and set new brief
        this._doc.brief = content.replace(/<(?:.|\n)*?>/gm, '');
    }
    next();
});

Post.defaultColumns = 'title, createdAt';
Post.register();
