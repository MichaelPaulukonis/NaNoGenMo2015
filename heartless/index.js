/*
 So, this tests stuff. Or something.
 Who knows.

 TODO: build creature generator
 need to create unique beasts
 probably adjective with one of the beasts
 or something else
 the hearltess tale will have to check that it is unique, and then re-query the generator
 if after 2 tries it fails, give one a number....
 [THIS WAY LIES MADNESS]

 TODO: generate powers
 TODO: generate locales

 words/adjective + words/adverb lists look useful

 geography things are too specific.
 will need some sort of list plus adj modifiers

 */



var stuff = function() {

  // these were ganked from dariusk's corpora project
  var animals = require('./animals')['animals'];
  var greekMonsters = require('./greek_monsters')['greek_monsters'];
  var monsters = require('./monsters')['names'];
  var adjectives = require('./wordbank')['adjectives'];

  var beasts = animals.concat(greekMonsters).concat(monsters);

  //console.log(beasts);

  var pick = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // return true or false
  // 50-50 chance (unless override)
  var coinflip = function(chance) {
    if (!chance) { chance = 0.5; }
    return (Math.random() < chance);
  };

  var doubleTrouble = function(sentiment) {

    if (sentiment === undefined) { sentiment = 'positive'; }

    var c1 = pick(beasts),
        c2 = pick(beasts);

    var name = '';

    if (coinflip(0.2)) {
      var adj = (sentiment === 'positive' ? 'positive' : 'negative');
      name = pick(adjectives[adj]) + ' ' + c2;
    } else {
      name = `${c1}-${c2}`;
    }

    return name;

  };

};

var test = function(storyLoops, mintwains, maxtwains) {

    // generates a random number
  var random = function(limit){
    var num = Math.floor(Math.random() * limit);
    return num;
  };

  function getRandomInt(min, max) {
    if (max === undefined) {
      max = min;
      min = 1;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var h = new require('./heartless')();

  var novel = [],
      giant = undefined,
      twains = [],
      og = {giantFuture: undefined};

  for(var i = 0; i < storyLoops; i++) {
    // TODO: random number
    var twainCount = getRandomInt(mintwains, maxtwains);
    // console.log(`twains: ${twainCount}`);
    twains = h.getTwains(twainCount);
    var continueTale = (i < storyLoops - 1 ? true : false);
    og = h.teller({twains: twains, giantThreat: og.giantFuture, continueTale: continueTale});
    novel.push(og.tale);
  }

  console.log(novel.join('\n\n'));

};


// TODO: use the inputName as part of the output....
var defaultOutputName = function(inputName) {

  return 'compare.' + (Math.random() * 0x1000000000).toString(36) + '.txt';

};


var program = require('commander');

program
  .version('0.0.1')
  .option('-l, --loops [int]', 'number of story loops (0)', 0)
  .option('--max, --maxtwains [int]', 'maximum number of twains', 5)
  .option('--min, --mintwains [int]', 'minimum number of twains', 1)
  // .option('-o, --output [file]', 'output file', defaultOutputName())
  .parse(process.argv);

// console.log(`loops: ${program.loops} maxTwains: ${program.maxtwains} minTwains: ${program.mintwains}`);

program.mintwains = parseInt(program.mintwains, 10);
program.maxtwains = parseInt(program.maxtwains, 10);

test(program.loops, program.mintwains, program.maxtwains);
