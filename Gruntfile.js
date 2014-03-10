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
        files: ['Gruntfile.js', 'js/**/*.js', 'less/**/*.less', 'html/index.html'],
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
    uglify: {
      options: {
        compress: false,
        beautify: true
      }
    },
    less: {
      production: {
        options: {
          cleancss: true
        },
        files: {
          'css/app.css': 'less/app.less'
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
  });

  grunt.registerTask('build', ['clean', 'less', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'htmlmin', 'usemin']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
