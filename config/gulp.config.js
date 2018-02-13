const projectConfig = require('./config');

module.exports = {
  app: {
    nodemon: {
      script: 'app.js',
      // nodeArgs: ['--inspect'],
      ext: 'js json',
      ignore: ['app/**/*.js', 'config/**/*.config.js', 'gulpfile.js', 'node_modules/'],
      env: {
        NODE_ENV: 'development',
      },
    },
    browserSync: {
      proxy: `http://localhost:${projectConfig.port}`,
      port: projectConfig.port + 1000,
      notify: true,
    },
  },
  copyFiles: [],
  html: {
    server: {
      src: 'server/views',
      ext: `.${projectConfig.viewEngine}`,
    },
    client: {
      src: 'app/js/views',
      ext: '.vue',
    },
  },
  styles: {
    src: 'app/scss',
  },
  js: {
    /**
     * src is the entry point for webpack
     */
    src: 'app/js/',
    entryFile: 'client.js',
    dist: 'app/js/',
  },
};
