/* eslint-disable */

if (process.env.NODE_ENV !== 'production') {
  const exec = require('child_process').exec;

  exec('node -v', function(err, stdout) {
    if (err) throw err;

    if (parseFloat(stdout.slice(1)) < 8) {
      throw new Error('Please install node.js 8.x');
    }
  });
}
