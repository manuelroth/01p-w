const gulp = require("gulp");
const workboxBuild = require("workbox-build");

gulp.task("service-worker", () => {
  return workboxBuild
    .injectManifest({
      swSrc: "./sw-config.js",
      swDest: "public/sw.js",
      globDirectory: "public",
      globPatterns: ["**/*.{js,css,html,png,jpg,woff2,json}"]
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
});
