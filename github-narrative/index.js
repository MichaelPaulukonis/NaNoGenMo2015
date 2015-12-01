'use strict';

var program = require('commander');

var include = function(val, types) {
  types.push(val);
  return types;
};

program
  .version('0.0.1')
  .option('-a, --archive', 'save to json file')
  .option('-f --file [string]', 'name of archive file (to read from/write to)', 'archive.json')
  .option('-u --url [string]', 'url of github issues')
  .option('-n --narrate [string]', 'tell the narrative')
  .option('-i --include [string]', 'issues, comments, events', include, ['issues', 'comments', 'events'])
  .parse(process.argv);

if (program.archive) {
  // TODO: output options should be in here....
  require('./archiveGithub')(program.file, program.url); // if not provided, we go with the default
}

if (program.narrate) {
  console.log(require('./narrative')(program.file, program.include));
}
