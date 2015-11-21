'use strict';

var program = require('commander');

program
  .version('0.0.1')
  .option('-a, --archive', 'save to json file')
  .option('-f --file [string]', 'name of archive file (to read from/write to)', 'archive.json')
  .option('-u --url [string]', 'url of github issues')
  .option('-n --narrate [string]', 'tell the narrative')
  .parse(process.argv);


if (program.archive) {
  // TODO: output options should be in here....
  require('./archiveGithub')(program.file, program.url); // if not provided, we go with the default
}

if (program.narrate) {
  console.log(require('./narrative')(program.file));
}
