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
        files: ['Gruntfile.js', 'js/**/*.js', 'less/**/*.less', 'index.html'],
        tasks: ['build']
      }
    },
    // copy: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       dot: true,
    //       dest: 'tmp',
    //       src: [ 'css/**', 'js/**', 'vendor/**', 'index.html' ]
    //     }],
    //   }
    // },
    uglify: {
      options: {
        compress: false,
        beautify: true
      }
    },
    connect: {
      dev: {
        options: {
          hostname: '0.0.0.0',
          base: 'dist',
          livereload: true,
          protocol: 'http',
          passphrase: ''
        }
      },
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
    s3: {
      options: {
        key:    process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        access: 'public-read',
        headers: {
          'Cache-Control':  'public, max-age=300'
        }
      },
      publish: {
        upload: [{
          src:    'dist/*',
          dest:   '/',
          options: { gzip: true }
        }]
      }
    },
    invalidate_cloudfront: {
      options: {
        key:            process.env.S3_KEY,
        secret:         process.env.S3_SECRET,
        distribution:   process.env.CDN_DISTRIBUTION
      },
      production: {
        files: [{
          expand:   true,
          cwd:      './dist/',
          src:      ['**/*'],
          filter:   'isFile',
          dest:     '/'
        }]
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist/'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      options: {
        dest: 'dist/'
      }
    },
    htmlmin: {
      dist: {
        files: [ {
          expand: true,
          //cwd: '',
          src: ['*.html'],
          dest: 'dist/'
        }]
      }
    },
  });

  grunt.registerTask('build', ['clean', 'less', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'htmlmin', 'usemin']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
