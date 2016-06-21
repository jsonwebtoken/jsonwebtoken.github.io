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
          'css/app.css': 'stylus/app.styl',
          'css/chrome-extension.css': 'stylus/chrome-extension.styl'
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

                    'vendor/crypto-js/core.js',

                    'vendor/jsonlint/lib/jsonlint.js',

                    'vendor/json-sans-eval-min/index.js',

                    'vendor/codemirror/lib/codemirror.js',
                    'vendor/codemirror/lib/codemirror.css',
                    'vendor/codemirror/mode/javascript/javascript.js',
                    'vendor/codemirror/addon/lint/lint.js',
                    'vendor/codemirror/addon/lint/lint.css',
                    'vendor/codemirror/addon/lint/javascript-lint.js',
                    'vendor/codemirror/addon/lint/json-lint.js',

                    'vendor/kjur-jsrsasign/jsrsasign-latest-all-min.js',

                    'extension-deps/**',
                    'js/**',
                    'css/**',
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
