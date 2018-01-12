const websiteWebpackConfigDev = require('./webpack.website-dev.js');
const websiteWebpackConfigProd = require('./webpack.website-prod.js');

module.exports = grunt => {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: [ 'dist' ],
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
          'dist/website/index.html': 'views/website/index.pug',
          'dist/website/introduction/index.html': 
            'views/website/introduction.pug'
        }
      }
    },
    webpack: {
      prod: websiteWebpackConfigProd,
      dev: websiteWebpackConfigDev
    },
    watch: {
      js: {
        files: 'src/**',
        tasks: 'webpack:dev'
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
        tasks: ['build-views']
      }
    }
  });

  grunt.registerTask('build-views', ['stylus', 'pug']);
  grunt.registerTask('build', ['clean', 'copy', 'build-views', 'webpack:prod']);
  grunt.registerTask('build-dev', 
                     ['clean', 'copy', 'build-views', 'webpack:dev']);
  grunt.registerTask('default', ['build-dev', 'watch']);
};
