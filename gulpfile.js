const gulp = require("gulp");

gulp.task("generate-service-worker", function(callback) {
  const path = require("path");
  const swPrecache = require("sw-precache");
  const rootDir = "public";

  swPrecache.write(
    path.join(rootDir, "sw.js"),
    {
      staticFileGlobs: [rootDir + "/**/*.{js,html,css,png,jpg,woff2,json}"],
      stripPrefix: rootDir
    },
    callback
  );
});
