module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: [
      'dist/'
    ],
    watch: {
      min: {
        options: {
          livereload: true
        },
        files: ['Gruntfile.js', 'js/**/*.js', 'stylus/**/*.styl', 'html/**/*.jade', 'html/index.html'],
        tasks: ['build']
      }
    },
    connect: {
      dev: {
        options: {
          hostname: '0.0.0.0',
          livereload: true,
          protocol: 'http',
          passphrase: ''
        }
      },
    },
    stylus: {
      compile: {
        files: {
          'css/app.css': 'stylus/app.styl'
        }
      }
    },
    jade: {
      compile: {
        files: {
          'new.html': 'html/new.jade'
        }
      }
    },
    useminPrepare: {
      html: 'html/index.html',
      options: {
        root: '.',
        dest: '.'
      }
    },
    usemin: {
      html: 'index.html',
      options: {
        assetsDir: ['dist/']
      }
    },
    htmlmin: {
      dist: {
        files:  { 'index.html': 'html/index.html' }
      }
    },
    mocha_phantomjs: {
      all: ['test/**/*.html']
    }
  });

  grunt.registerTask('build', ['clean', 'stylus', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'htmlmin', 'usemin']);
  grunt.registerTask('test', ['build', 'mocha_phantomjs']);
  grunt.registerTask('default', ['build', 'jade', 'connect', 'watch']);
};
