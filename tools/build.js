// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
const webpack = require('webpack');
const config = require('../webpack.config.prod');
const chalkConfig = require('./chalkConfig');

const chalkError = chalkConfig.chalkError;
const chalkSuccess = chalkConfig.chalkSuccess;
const chalkWarning = chalkConfig.chalkWarning;
const chalkProcessing = chalkConfig.chalkProcessing;

console.log(
  chalkProcessing('Generating minified bundle. This will take a moment...'),
);

webpack(config).run((error, stats) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(e => console.log(chalkError(e)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(
    chalkSuccess(
      "Your app is compiled in production mode in /dist. It's ready to roll!",
    ),
  );

  return 0;
});
