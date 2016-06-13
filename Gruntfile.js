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
    mocha_phantomjs: {
      all: ['test/**/*.html']
    },
    copy: {
        crx: {
            files: [{
                src: [
                    'manifest.json',
                    'index.html',
                    'img/**',
                    'vendor/**',
                    'js/**',
                    'css/**',
                    'fonts/**',
                    'assets/**'
                ],
                dest: 'dist/'
            }]
        }
    },
    run: {
        crx: {
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('build', ['stylus', 'jade']);
  grunt.registerTask('test', ['build', 'mocha_phantomjs']);
  grunt.registerTask('chrome-extension', ['build', 'copy:crx', 'run:crx']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
