module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      concat: {
        dist: {
          src: [
            'js/*.js'
          ],
          dest: 'js/build/production.js',
        }
      },

      uglify: {
        build: {
          src: 'js/build/production.js',
          dest: 'js/build/production.min.js'
        }
      },

      compass: {
        dev: {
          options: {
            config: 'config.rb',
            force: true
          }
        }
      },

      sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: [{
            expand: true,
            cwd: 'css/scss/partials',
            src: ['*.scss'],
            dest: 'css/',
            ext: '.css'
          }], 'main.css': 'main.scss',
        },
        dev: {
          files: [{'css/main.css': 'css/scss/main.scss'}]
        }
      },

      cssmin: {
        combine: {
          files: {
            'css/main.min.css': [ 'css/main.css' ]
          }
        }
      },

      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: 'images/orig_assets',
            src: ['*.{png,jpg,gif}'],
            dest: 'images'
          }]
        }
      },

      watch: {
        scripts: {
          files: ['js/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false,
          }
        },
        css: {
          files: ['css/scss/partials/*.scss','css/scss/theme/*.scss','css/scss/globals/*.scss'],
          tasks: ['compass', 'cssmin'],
          options: {
            spawn: false,
          }
        },
      }

    });

    grunt.registerTask('build', ['concat', 'uglify', 'compass', 'cssmin', 'imagemin', 'watch']);
    grunt.registerTask('dev', ['concat', 'uglify', 'compass', 'cssmin', 'watch']);
    grunt.registerTask('js', ['concat', 'uglify', 'watch']);
    grunt.registerTask('css', ['compass', 'cssmin', 'watch']);

};
