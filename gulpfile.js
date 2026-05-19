const gulp = require("gulp");
const data = require("gulp-data");
const fs = require("fs");
const path = require("path");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const sourceMaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const twig = require("gulp-twig");
const moment = require("moment");

gulp.task("twig", function () {
  return gulp
    .src(["templates/pages/**/*.twig", "!templates/pages/**/api-*.twig"])

    .pipe(
      data((file) => {
        const basePath = path.dirname(file.path).replace("templates", "data");
        // const jsonFile = basePath + '/' + path.basename(file.path, '.twig') + '.json';
        const jsFile =
          basePath + "/" + path.basename(file.path, ".twig") + ".js";

        if (fs.existsSync(jsFile)) {
          return require(jsFile);
        }
        return false;
      })
    )
    .pipe(
      data(() => {
        return require("./data/craft.js");
      })
    )
    .pipe(
      data(() => {
        return require("./data/global-information.js");
      })
    )
    .pipe(
      data(() => {
        return require("./data/global-settings.js");
      })
    )
    .pipe(
      twig({
        base: "templates",
        errorLogToConsole: true,
        functions: [
          {
            name: "csrfInput",
            func: function (args) {
              return "";
            },
          },
          {
            name: "actionInput",
            func: function (args) {
              return "";
            },
          },
          {
            name: "cpUrl",
            func: function (args) {
              return "";
            },
          },
          {
            name: "redirectInput",
            func: function (args) {
              return "";
            },
          },
          {
            name: "input",
            func: function (type, name, value, options) {
              const attributeArray = [];
              for (let option in options) {
                attributeArray.push(option + '="' + options[option] + '"');
              }
              const attributes = attributeArray.join(" ");

              return `<input type="${type}" name="${name}" value="${value}" ${attributes}>`;
            },
          },
          {
            name: "url",
            func: function (args) {
              return args;
            },
          },
        ],
        filters: [
          {
            name: "kebab",
            func: function (args) {
              if (typeof args !== "undefined") {
                return args.trim().toLowerCase().replace(/(\s+)/g, "-");
              } else {
                return "";
              }
            },
          },
          {
            name: "unique",
            func: function (args) {
              return args;
            },
          },
          {
            name: "date",
            func: function (data, format) {
              data = data || new Date().toISOString();
              if (typeof data === "string") {
                data = new Date().toISOString();
              }

              const date = moment(data);
              switch (format) {
                case "D":
                  return date.format("dd");
                case "d.m.Y":
                  return date.format("DD.MM.YYYY");
                default:
                  return date.format("DD.MM.YYYY");
              }
            },
          },
        ],
      })
    )
    .pipe(gulp.dest("static"));
});

gulp.task("twig-watcher", gulp.series("twig", browserSync.reload));

gulp.task("assets", () => {
  return gulp.src("web/assets/**").pipe(gulp.dest("static/assets"));
});
gulp.task("files", () => {
  return gulp.src(["web/favicon.ico"]).pipe(gulp.dest("static/"));
});
gulp.task("litepicker", () => {
  return gulp
    .src([
      "node_modules/litepicker/dist/litepicker.js",
      "node_modules/litepicker/dist/plugins/mobilefriendly.js",
    ])
    .pipe(gulp.dest("web/js/plugins"))
    .pipe(gulp.dest("static/js/plugins"));
});

gulp.task(
  "assets-watcher",
  gulp.series("assets", "files", "litepicker", browserSync.reload)
);

gulp.task("js", () => {
  return gulp
    .src(["web/js/**/*.js", "!web/js/**/*.min.js", "!web/js/plugins/**"])
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourceMaps.write("/"))
    .pipe(gulp.dest("static/js"))
    .pipe(gulp.dest("web/js"));
});
gulp.task("js-watcher", gulp.series("js", browserSync.reload));

gulp.task("sass", () => {
  return gulp
    .src("web/**/*.scss")
    .pipe(sourceMaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(sourceMaps.write("/"))
    .pipe(gulp.dest("static"))
    .pipe(gulp.dest("web"));
});
gulp.task("sass-watcher", gulp.series("sass", browserSync.reload));

gulp.task("clear", (cb) => {
  try {
    fs.rmSync("static", { recursive: true });
  } catch (e) {}
  cb();
});

gulp.task(
  "build",
  gulp.series("clear", "assets", "files", "litepicker", "twig", "sass", "js")
);

gulp.task(
  "serve",
  gulp.series("build", () => {
    browserSync.init({
      // browser: ['Google Chrome'],
      server: {
        baseDir: "./static",
      },
      port: 5173,
    });

    gulp.watch("templates/**/*.twig").on("change", gulp.series("twig-watcher"));
    gulp.watch("data/**/*.js").on("change", gulp.series("twig-watcher"));
    gulp.watch("web/**/*.scss").on("change", gulp.series("sass-watcher"));
    gulp
      .watch(["web/js/**/*.js", "!web/js/**/*.min.js", "!web/js/plugins/**"])
      .on("change", gulp.series("js-watcher"));
  })
);
