module.exports = function(grunt) {
    //LIVE RELOAD IS BROKEN

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                // Override defaults here
                livereload: true
            },
            dev: {
                options: {
                    script: './web.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/**/*.js'],
                dest: 'public/scripts/<%= pkg.name %>.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', '*.js', 'routes/*/*.js', 'routes/*.js', '!public/scripts/*.js', '!node_modules/*'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint'],
            options: {
                livereload: true
            },
            express: {
                files: ['*.js', 'routes/*/*.js', 'routes/*.js', 'models/*.js', '!**/node_modules/**', '!Gruntfile.js'],
                tasks: ['jshint', 'express:dev:stop', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            asdf: {
                files: ['public/scripts/mysite.js'],
                tasks: ['uglify']
            },
            css: {
                files: 'public/styles/style.scss',
                tasks: ['sass']
            }
        },
        sass: {
            dist: {
                files: {
                    'public/styles/style.css': 'public/styles/style.scss'
                }
            }
        }
        //sass: {
        //options: {
        //cacheLocation: '.tmp/.sass-cache'
        //},
        //dev: {
        //options: {
        //style: 'expanded',
        //lineComments: true
        //},
        //files: [{
        //expand: true,
        //cwd: 'public/styles/',
        //dest: 'public/styles',
        //src: ['style.scss'],
        //ext: '.css'
        //}]
        //}
        //}
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //grunt.registerTask('default', ['express:dev']);
    grunt.registerTask('default', ['express:dev', 'sass', 'uglify', 'watch']);

    grunt.registerTask('concat', ['concat']);
};
