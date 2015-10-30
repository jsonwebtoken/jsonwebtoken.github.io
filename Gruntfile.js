module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // clean: [
    //   'dist/'
    // ],
    watch: {
      min: {
        options: {
          livereload: true
        },
        files: ['Gruntfile.js', 'js/**/*.js', 'stylus/**/*.styl', 'views/**/*.jade', 'views/**/*.md'],
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
          'index.html': 'views/index.jade',
          'introduction/index.html': 'views/introduction.jade'
        }
      }
    },
    // useminPrepare: {
    //   html: 'html/index.html',
    //   options: {
    //     root: '.',
    //     dest: '.'
    //   }
    // },
    // usemin: {
    //   html: 'index.html',
    //   options: {
    //     assetsDir: ['dist/']
    //   }
    // },
    // htmlmin: {
    //   dist: {
    //     files:  { 'index.html': 'html/index.html' }
    //   }
    // },
    mocha_phantomjs: {
      all: ['test/**/*.html']
    }
  });

  grunt.registerTask('build', ['stylus', 'jade']);
  // grunt.registerTask('build', ['clean', 'stylus', 'jade', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'htmlmin', 'usemin']);
  grunt.registerTask('test', ['build', 'mocha_phantomjs']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
