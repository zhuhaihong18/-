const gulp = require("gulp");
// html
// const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html",function(){
  return gulp.src("*.html")
  .pipe(gulp.dest("dist/"))
  .pipe(connect.reload());
})
// images
gulp.task("images", function(){
  return gulp.src(["images/*.png","images/*.jpg"])
  .pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());
})
// js
gulp.task("scripts",function(){
  return gulp.src(["*.js","!gulpfile.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload())
})
// json
gulp.task("data",function(){
  return gulp.src(["*.json","!package.json","!package-lock.json"])
  .pipe(gulp.dest("dist/data"))
  .pipe(connect.reload())
})

gulp.task("build",["copy-html","scripts","data","images","sass"],function(){
  console.log("项目加载成功");
})

// css
const sass = require("gulp-sass");
const rename = require("gulp-rename");
gulp.task("sass",function(){
  return gulp.src(["./stylesheet/*.scss"])
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload())
})

// 监听
gulp.task("watch",function(){
  gulp.watch("*.html",["copy-html"]);
  gulp.watch(["images/*.png","images/*.jpg"], ['images']);
  gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
  gulp.watch(["*.json", "!package.json"], ['data']);
  gulp.watch(["./stylesheet/*.scss"], ["sass"]);
})

// 启动服务
const connect = require("gulp-connect");
gulp.task("server", function(){
  connect.server({
    root: "dist",
    port: 3333,
    livereload: true
  })
})

gulp.task("default", ["watch", "server","sass"]);