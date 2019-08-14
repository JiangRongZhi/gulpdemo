const gulp = require('gulp'),
  del = require('del'),
  browserSync = require('browser-sync'),
  tinypng = require('gulp-tinypng'),
  pngquant = require('imagemin-pngquant'),
  spriter = require('gulp-css-spriter'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  spritesmith = require('gulp.spritesmith'),
  htmlmin = require('gulp-htmlmin'),
  assetRev = require('gulp-asset-rev'),
  runSequence = require('run-sequence'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  start = require('gulpstart'),
  $ = gulpLoadPlugins({
    'rename': {
      'gulp-clean-css': 'cleancss'
    }
  }),
  dist = 'dist/static/',
  src = {
    vendor: [
      'node_modules/jquery/dist/jquery.min.js',
      'src/plugins/layer/build/mobile/layer.js'
    ],
    scripts: [
      'src/static/scripts/event.js',
      'src/static/scripts/main.js',
    ],
    less: [
      'src/static/styles/global.less',
      'src/static/styles/main.less',
      'src/static/styles/animate.less'
      //'src/plugins/swper/dist/css/swiper.min.css'
      //'src/static/styles/layer.less'
    ],
    png: 'src/static/images/**/*.png',
    images: 'src/static/images/**/*.{jpg,jpeg,gif,svg}',
    font: 'src/static/font/**/*',
    api: 'src/api/**/*'
  };
var reload = browserSync.reload;
/*将用到的插件合并成一个文件vendor.min.js*/
gulp.task('vendor', function () {
  return gulp.src(src.vendor)
    .pipe($.cached('vendor'))
    .pipe($.plumber())
    .pipe($.concat('vendor.min.js'))
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(gulp.dest(dist + 'scripts'))
    .pipe($.notify({
      message: 'Vendor已经合并完成！！！'
    }));
});

/*合并压缩js*/
gulp.task('scripts', function () {
  return gulp.src(src.scripts)
    .pipe($.plumber())
    .pipe($.jshint()) /* 进行检查*/
    .pipe($.jshint.reporter('default')) /* 对代码进行报错提示*/
    .pipe($.concat('app.min.js'))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + 'scripts'))
    .pipe($.notify({
      message: 'App.min.Js压缩任务完成！'
    }));
});

/*编译less 并压缩css*/
gulp.task('less', function () {
  return gulp.src(src.less)
    .pipe($.plumber())
    .pipe($.autoprefixer({
      browsers: [
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 9',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ],
      cascade: true,
      remove: false
    }))
    .pipe($.less())
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.min.css'))
    .pipe($.cleancss())
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + 'styles'))
    .pipe(reload({ stream: true }))
    .pipe($.notify({
      message: 'Less编译完成！'
    }));
});

/*压缩png,jpg图片（Tinypng）*/
gulp.task('tinypng', function () {
  return gulp.src(src.png)
    .pipe($.cached('tinypng'))
    .pipe($.plumber())
    .pipe($.cache(tinypng('elUG7o5X_acl20dsHtJyaBTU1ReA1FNK')))
    //.pipe($.cache(tinypng('lwPCo782phtJRLGFbZk-xZkfco2lQxLX')))
    //.pipe($.cache(tinypng('l4IX_ou6LYHtrLQZcWwd51Z4CoaZ5tpr')))
    .pipe(gulp.dest(dist + 'images'))
    .pipe(reload({ stream: true }))
    .pipe($.notify({
      message: '图片压缩完成！'
    }));
});

/* 压缩除png以外类型的图片 */
gulp.task('images', function () {
  return gulp.src(src.images)
    .pipe($.cached('images'))
    .pipe($.plumber())
    .pipe($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false /* 不要移除svg的viewbox属性 */
      }],
      use: [pngquant()] /* 使用pngquant深度压缩png图片的imagemin插件 */
    }))
    .pipe(gulp.dest(dist + 'images'))
    .pipe(reload({ stream: true }))
    .pipe($.notify({
      message: '图片压缩完成！'
    }));
});

/*  html 编译 html 文件 */
gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe($.cached('html'))
    .pipe($.plumber())
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({
      message: 'html任务完成！'
    }));
});

/* 压缩Html */
gulp.task('htmlmin', function () {
  var options = {
    removeComments: true,
    /* 清除HTML注释 */
    collapseWhitespace: true,
    /* 压缩HTML */
    collapseBooleanAttributes: true,
    /* 省略布尔属性的值 <input checked="true"/> ==> <input /> */
    removeEmptyAttributes: true,
    /* 删除所有空格作属性值 <input id="" /> ==> <input /> */
    removeScriptTypeAttributes: true,
    /* 删除<script>的type="text/javascript" */
    removeStyleLinkTypeAttributes: true,
    /* 删除<style>和<link>的type="text/css" */
    minifyJS: true,
    /* 压缩页面JS */
    minifyCSS: true /* 压缩页面CSS */
  };
  gulp.src('src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({
      message: 'html压缩任务完成！'
    }));
});

/* 拷贝api 到 assets 目录下 */
gulp.task('api', function () {
  return gulp.src(src.api)
    .pipe($.cached('api'))
    .pipe($.plumber())
    .pipe(gulp.dest('dist/api/'))
    .pipe($.notify({
      message: 'api拷贝完成！'
    }));
});

/* clean 清空 assets 目录 */
gulp.task('clean', function () {
  return del('dist');
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  });
});
gulp.task('watch', function () {
  gulp.watch('src/static/styles/*', gulp.series('less'));
  gulp.watch('src/static/scripts/*', gulp.series('scripts'));
  gulp.watch('src/static/images/**/*.{jpeg,jpg,gif,svg}', gulp.series('images'));
  gulp.watch('src/static/images/**/*.png', gulp.series('tinypng'));
  gulp.watch('src/**/*.html', gulp.series('html'));

});


gulp.task('default', gulp.series(gulp.parallel('serve', 'watch', 'html', 'less', 'scripts','tinypng','images')));










