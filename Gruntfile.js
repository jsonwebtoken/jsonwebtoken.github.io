const websiteWebpackConfig = require('./website.webpack.config.js');

module.exports = grunt => {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['img/**', 'fonts/**', 'assets/**', 'opensearch.xml'],
          dest: 'dist/website'
        }, {
          expand: true,
          flatten: true,
          src: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/codemirror/lib/codemirror.css',
            'node_modules/codemirror/addon/lint/lint.css',
            'css/budicon.css'
          ],
          dest: 'dist/website/css/'
        }]
      }
    }, 
    stylus: {
      compile: {
        files: {
          'dist/website/css/app.css': 'stylus/app.styl'
        }
      }
    },
    pug: {
      compile: {
        files: {
          'dist/website/index.html': 'views/index.pug',
          'dist/website/introduction/index.html': 'views/introduction.pug'
        }
      }
    },
    webpack: {
      prod: websiteWebpackConfig,
      dev: websiteWebpackConfig
    },
    watch: {
      js: {
        files: 'src/**',
        tasks: 'webpack'
      },
      assets: {
        files: [
          'img/**',
          'fonts/**',
          'assets/**',
          'opensearch.xml',
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/addon/lint/lint.css',
          'css/budicon.css'
        ],
        tasks: 'copy'
      },
      views: {
        files: ['stylus/**', 'views/**'],
        tasks: ['stylus', 'pug']
      }
    }
  });

  grunt.registerTask('build', ['copy', 'stylus', 'pug', 'webpack']);
  grunt.registerTask('default', ['build', 'watch']);
};
