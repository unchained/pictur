const path = require('path'),
  chalk = require('chalk'),
  dedent = require('dedent-js'),
  gulp = require('gulp'),
  GulpClass = require('classy-gulp'),

  /**
   * Gulp plugins starting with "gulp-<name>" are loaded automatically under gulpPlugins.<name>
   *     You can rename them or call functions on required plugins via options object passed to gulp-load-plugins:
   *     {
     *     rename: {},
     *     postRequireTransforms: {}
     *     }
   * Others are manually appended via the second array.
   */
  gulpPlugins = {
    ...require('gulp-load-plugins')(),
    ...{
      browserSync: require('browser-sync').create(),
      webpack: require('webpack-stream'),
      yargs: require('yargs'),
      /**
       * enables us to define webpack entry points via gulp.src
       */
      named: require('vinyl-named'),
    },
  },
  gulpOptions = {
    ...require('./config/gulp.config'),
    ...{
      production: !!(gulpPlugins.yargs.argv.production),
      analyzeWebpack: !!(gulpPlugins.yargs.argv.analyze),
    },
  };

class Flow extends GulpClass {
  constructor() {
    super();
    /**
     * A friendly greeting for you, you beautiful ;)
     */
    console.log(chalk.blue(dedent(`
        * Hey! I'm gulp. ༼つಠ益ಠ༽つ ─=≡ΣO))
        * Your personal workflow magician.
        `)));
  }

  defineTasks() {
    /**
     * All tasks which are accessible via "gulp <taskName>" are defined here.
     */
    return {
      build: gulp.parallel(/* this.copyFiles, */this.vue),
      nodemon: gulp.series(this.server),
      server: gulp.series('nodemon', this.startBrowserSync, (done) => {
        done();
      }),
      deploy: gulp.series('build'),
      default: gulp.series('build', 'server', this.watch),
    };
  }

  /**
   * Runs everything we need to do with Vue. Compiles Vue templates including SCSS via webpack
   */
  vue() {
    return gulp.src(gulpOptions.js.src + gulpOptions.js.entryFile)
      .pipe(gulpPlugins.plumber())
      .pipe(gulpPlugins.named())
      .pipe(gulpPlugins.webpack(require('./config/webpack.config.js')({
        environment: gulpOptions.production ? 'production' : 'development',
        analyze: gulpOptions.analyzeWebpack,
      })))
      .pipe(gulp.dest(gulpOptions.js.dist));
  }

  /**
   * Copies specific files defined in gulp options.
   */
  copyFiles(done) {
    gulp.src(gulpOptions.copyFiles, { base: 'src', allowEmpty: true })
      .pipe(gulp.dest('dist'));
    done();
  }

  /**
   * Watches for changes and automatically performs a given task depending on the type of file changed.
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronous completion (do not use!)
   */
  watch(done) {
    gulp.watch(path.join(gulpOptions.styles.src, '/**/*.scss'), gulp.series(this.vue, this.reload)); // SCSS recompile & reload
    gulp.watch(path.join(gulpOptions.html.client.src, `**/*${gulpOptions.html.client.ext}`), gulp.series(this.vue, this.reload)); // Vue templates
    gulp.watch(path.join(gulpOptions.html.server.src, `**/*${gulpOptions.html.server.ext}`), gulp.series(this.reload)); // EJS templates
    gulp.watch([path.join(gulpOptions.js.src, '**/*.js'), `!${path.join(gulpOptions.js.src, '**/*.min.js')}`], gulp.series(this.vue, this.reload)); // JS general logic
    done();
  }

  /**
   *      ========= "Utility" classes start =========
   */


  /**
   *      ========= BrowserSync =========
   */

  // TODO: move BrowserSync to webpack?

  /**
   * Starts the browsersync proxy server
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronius completion (do not use!)
   */
  startBrowserSync(done) {
    setTimeout(() => {
      gulpPlugins.browserSync.init(gulpOptions.app.browserSync);
      done();
    }, 1000);
  }

  /**
   * Reloads the whole page via browsersync
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronius completion (do not use!)
   */
  reload(done) {
    gulpPlugins.browserSync.reload();
    done();
  }

  /**
   *      ======== Nodemon ========
   */

  /**
   * Initializes a nodemon server
   * @param {function} [done] - An automatically assigned and invoked callback to signal asynchronous completion (do not use!)
   */
  server(done) {
    const _this = this;
    let called = false;
    const server = gulpPlugins.nodemon(gulpOptions.app.nodemon);

    server.on('start', () => {
      if (!called) {
        called = true;
        done();
      }
    });

    server.on('restart', () => {
      console.log(chalk.green(dedent(`
            * 
            *   Retarting nodemon server...
            *
            `)));
      gulp.series(_this.reload);
    });

    server.on('crash', () => {
      console.log(chalk.green(dedent(`
            * 
            *   Nodemon server crashed! Restarting in 5 seconds...
            *
            `)));
      server.emit('restart', 5); // restart the server in 5 seconds
    });
  }
}

/**
 *      Let's get the party started!
 *      Don't forget to have fun on this new project! (✿ ◕ ‿ ◕)ᓄ ╰U╯
 */
gulp.registry(new Flow());
